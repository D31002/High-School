package com.teacher_service.service;

import com.teacher_service.Exception.AppException;
import com.teacher_service.Exception.ErrorCode;
import com.teacher_service.Mapper.TeacherMapper;
import com.teacher_service.Models.Teacher;
import com.teacher_service.Models.UserType;
import com.teacher_service.dto.request.ArrayIdRequest;
import com.teacher_service.dto.request.TeacherCreationRequest;
import com.teacher_service.dto.request.UserProfileCreationRequest;
import com.teacher_service.dto.response.*;
import com.teacher_service.repository.HttpClient.ClassRoomClient;
import com.teacher_service.repository.HttpClient.ProfileClient;
import com.teacher_service.repository.HttpClient.TeacherSubjectClient;
import com.teacher_service.repository.TeacherRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class TeacherService {
    TeacherRepository teacherRepository;
    TeacherMapper teacherMapper;
    ProfileClient profileClient;
    TeacherSubjectClient teacherSubjectClient;
    ClassRoomClient classRoomClient;

    private TeacherResponse mapToTeacherResponse(Teacher teacher) {
        UserProfileResponse userProfileResponse = profileClient.getProfileById(teacher.getProfileId()).getResult();
        TeacherResponse teacherResponse = teacherMapper.toteacherResponse(teacher);
        teacherResponse.setUserProfileResponse(userProfileResponse);
        return teacherResponse;
    }

    public TeacherResponse getTeacherByProfileId(int profileId) {
        Teacher teacher = teacherRepository.findByProfileId(profileId);
        return mapToTeacherResponse(teacher);
    }

    public TeacherResponse getTeacherById(int id) {
        Teacher teacher = teacherRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.TEACHER_NOT_EXISTED));
        return mapToTeacherResponse(teacher);
    }

    boolean hasRole(UserResponse userResponse) {
        return userResponse.getRoles().stream()
                .anyMatch(role -> "TEACHER".equals(role.getName()));
    }

    public List<TeacherResponse> getAllTeacher() {
        List<Teacher> teacherList = teacherRepository.findAll();
        return teacherList.stream()
                .map(this::mapToTeacherResponse)
                .filter(teacherResponse -> hasRole(teacherResponse.getUserProfileResponse().getUserResponse()))
                .collect(Collectors.toList());
    }


    public PageResponse<TeacherResponse> getAllTeacherBySubjectId(int subjectId,int page,int pageSize, String keyword) {
        if(subjectId == -1){
            return new PageResponse<>();
        }

        List<TeacherSubjectResponse> teacherSubjectResponseList =
                teacherSubjectClient.getTeacherIdBySubjectId(subjectId).getResult();

        List<UserProfileResponse> userProfileList = profileClient.searchUserProfilesByFullName(keyword).getResult();

        Set<Integer> userProfileTeacherIds = userProfileList.stream()
                .map(UserProfileResponse::getId)
                .collect(Collectors.toSet());

        List<Teacher> teacherList = teacherSubjectResponseList.stream()
                .map(teacherSubjectResponse -> teacherRepository.findById(teacherSubjectResponse.getTeacherId())
                        .orElseThrow(() -> new AppException(ErrorCode.TEACHER_NOT_EXISTED)))
                .filter(teacher -> userProfileTeacherIds.contains(teacher.getId()))
                .toList();

        Sort sort = Sort.by("teacherCode").ascending();
        Pageable pageable = PageRequest.of(page-1,pageSize,sort);

        Page<Teacher> teacherPage = teacherRepository.findByTeacherList(teacherList,pageable);

        List<TeacherResponse> teacherResponseList =
                teacherList.stream()
                        .map(this::mapToTeacherResponse)
                        .toList();

        return PageResponse.<TeacherResponse>builder()
                .currentPage(page)
                .pageSize(teacherPage.getSize())
                .totalPages(teacherPage.getTotalPages())
                .totalElements(teacherPage.getTotalElements())
                .data(teacherResponseList)
                .build();
    }

    public List<TeacherResponse> getAllTeacherBySubjectIdNotPagination(int subjectId) {
        List<TeacherSubjectResponse> teacherSubjectResponseList =
                teacherSubjectClient.getTeacherIdBySubjectId(subjectId).getResult();

        List<Teacher> teacherList = teacherSubjectResponseList.stream()
                .map(teacherSubjectResponse ->
                        teacherRepository.findById(teacherSubjectResponse.getTeacherId()).orElseThrow(() -> new AppException(ErrorCode.TEACHER_NOT_EXISTED)))
                .toList();
        return teacherList.stream().map(this::mapToTeacherResponse).toList();
    }

    public List<TeacherResponse> getTeachersNotBySubjectId(int subjectId, String keyword) {
        List<TeacherSubjectResponse> teacherSubjectResponseList =
                teacherSubjectClient.getTeacherIdBySubjectId(subjectId).getResult();

        Set<Integer> teacherIdsBySubject = teacherSubjectResponseList.stream()
                .map(TeacherSubjectResponse::getTeacherId)
                .collect(Collectors.toSet());

        List<Teacher> teacherList = teacherRepository.findAll();

        List<Teacher> teachersNotBySubject = teacherList.stream()
                .filter(teacher -> !teacherIdsBySubject.contains(teacher.getId()))
                .toList();

        return teachersNotBySubject.stream()
                .map(teacher->getTeacherById(teacher.getId()))
                .filter(teacherResponse -> teacherResponse.getTeacherCode().toLowerCase().contains(keyword.toLowerCase()))
                .filter(teacherResponse -> hasRole(teacherResponse.getUserProfileResponse().getUserResponse()))
                .toList();
    }

    public TeacherResponse createTeacher(int subjectId, TeacherCreationRequest request) {
        Teacher exitsTeacher = teacherRepository.findByTeacherCode(request.getTeacherCode());
        if(exitsTeacher != null){
            throw new AppException(ErrorCode.TEACHER_CODE_EXISTED);
        }
        UserProfileCreationRequest userProfileCreationRequest =
                teacherMapper.toUserProfileCreationRequest(request);

        userProfileCreationRequest.setUserType(UserType.teacher);

        UserProfileResponse userProfileResponse =
                profileClient.createProfile(userProfileCreationRequest).getResult();

        Teacher teacher = teacherRepository.save(Teacher.builder()
                .teacherCode(request.getTeacherCode())
                .profileId(userProfileResponse.getId())
                .build());
        teacherSubjectClient.addTeacherIdInSubjectId(teacher.getId(),subjectId);

        return getTeacherById(teacher.getId());
    }

    public void createTeacherFromExcel(int subjectId, List<TeacherCreationRequest> request) {
        List<TeacherSubjectResponse> teacherSubjectResponseList =
                teacherSubjectClient.getTeacherIdBySubjectId(subjectId).getResult();
        if(!CollectionUtils.isEmpty(teacherSubjectResponseList))
            throw new AppException(ErrorCode.TEACHER_EXISTED);

        List<String> requestTeacherCodes = request.stream()
                .map(TeacherCreationRequest::getTeacherCode)
                .collect(Collectors.toList());

        List<String> existingTeacherCodes = teacherRepository.findTeacherCodesByCodes(requestTeacherCodes);

        if (!CollectionUtils.isEmpty(existingTeacherCodes)) {
            throw new AppException(ErrorCode.TEACHER_CODE_EXISTED);
        }
        for (TeacherCreationRequest req : request){
            UserProfileCreationRequest userProfileCreationRequest =
                    teacherMapper.toUserProfileCreationRequest(req);

            userProfileCreationRequest.setUserType(UserType.teacher);

            UserProfileResponse userProfileResponse =
                    profileClient.createProfile(userProfileCreationRequest).getResult();

            Teacher teacher = teacherRepository.save(Teacher.builder()
                    .teacherCode(req.getTeacherCode())
                    .profileId(userProfileResponse.getId())
                    .build());

            teacherSubjectClient.addTeacherIdInSubjectId(teacher.getId(),subjectId);
        }
    }

    public void addTeacherExisted(int subjectId, int teacherId) {
        teacherSubjectClient.addTeacherIdInSubjectId(teacherId,subjectId);
    }

    public TeacherResponse editTeacher(int teacherId, TeacherCreationRequest request) {
        Teacher teacher = teacherRepository.findById(teacherId)
                .orElseThrow(() -> new AppException(ErrorCode.TEACHER_NOT_EXISTED));

        teacher.setTeacherCode(request.getTeacherCode());

        UserProfileCreationRequest userProfileCreationRequest =
                teacherMapper.toUserProfileCreationRequest(request);

        UserProfileResponse userProfileResponse =
                profileClient.editProfile(teacher.getProfileId(),userProfileCreationRequest).getResult();


        TeacherResponse teacherResponse = teacherMapper.toteacherResponse(teacherRepository.save(teacher));
        teacherResponse.setUserProfileResponse(userProfileResponse);

        return teacherResponse;
    }

    public void deleteTeacher(int subjectId, ArrayIdRequest request) {
        if(CollectionUtils.isEmpty(request.getArrId()))
            throw new AppException(ErrorCode.INVALID_REQUEST);

        for(Integer teacherId : request.getArrId()){
            Teacher teacher = teacherRepository.findById(teacherId)
                    .orElseThrow(() -> new AppException(ErrorCode.TEACHER_NOT_EXISTED));

            List<ArrSubjectResponse> arrSubjectResponseList =
                    teacherSubjectClient.getSubjectIdByTeacherId(teacherId).getResult();

            boolean hasOtherSubject = arrSubjectResponseList.stream()
                            .anyMatch(a -> a.getSubjectId() != subjectId);


            if(hasOtherSubject){
                teacherSubjectClient.deleteTeacherIdInSubjectId(teacherId, subjectId);
            }else{
                profileClient.deleteProfile(teacher.getProfileId());
                teacherSubjectClient.deleteTeacherIdInSubjectId(teacherId, subjectId);
                teacherRepository.delete(teacher);
            }
        }
    }



}
