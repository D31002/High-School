package com.student_service.service;

import com.student_service.Exception.AppException;
import com.student_service.Exception.ErrorCode;
import com.student_service.dto.request.ArrayIdRequest;
import com.student_service.dto.request.StudentCreationRequest;
import com.student_service.dto.request.StudentEditRequest;
import com.student_service.dto.request.UserProfileCreationRequest;
import com.student_service.dto.response.PageResponse;
import com.student_service.dto.response.StudentClassRoomResponse;
import com.student_service.dto.response.StudentResponse;
import com.student_service.dto.response.UserProfileResponse;
import com.student_service.mapper.StudentMapper;
import com.student_service.models.Status;
import com.student_service.models.Student;
import com.student_service.models.UserType;
import com.student_service.repository.HttpClient.ProfileClient;
import com.student_service.repository.HttpClient.StudentClassRoomClient;
import com.student_service.repository.StudentRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class StudentService {

    StudentRepository studentRepository;
    StudentMapper studentMapper;
    ProfileClient profileClient;
    StudentClassRoomClient studentClassRoomClient;

    private StudentResponse mapToStudentResponse(Student student){
        UserProfileResponse userProfileResponse = profileClient.getProfileById(student.getProfileId()).getResult();
        StudentResponse studentResponse = studentMapper.toStudentResponse(student);
        studentResponse.setUserProfileResponse(userProfileResponse);
        return studentResponse;
    }

    public StudentResponse getStudentByProfileId(int profileId) {
        Student teacher = studentRepository.findByProfileId(profileId);
        return getStudentById(teacher.getId());
    }

    public PageResponse<StudentResponse> getStudentByClassRoom(int classRoomId, int page, int pageSize, String keyword) {
        List<StudentClassRoomResponse> studentClassRoomResponseList =
                studentClassRoomClient.getStudentIdByClassRoomId(classRoomId).getResult();

        List<UserProfileResponse> userProfileList =
                profileClient.searchUserProfilesByFullName(keyword).getResult();

        Set<Integer> userProfileStudentIds = userProfileList.stream()
                .map(UserProfileResponse::getId)
                .collect(Collectors.toSet());

        List<Student> studentList = studentClassRoomResponseList.stream()
                .map(studentClassRoomResponse -> studentRepository.findById(studentClassRoomResponse.getStudentId())
                        .orElseThrow(() -> new AppException(ErrorCode.STUDENT_NOT_EXISTED)))
                .filter(student -> userProfileStudentIds.contains(student.getProfileId()))
                .toList();

        Sort sort = Sort.by("studentCode").ascending();
        Pageable pageable = PageRequest.of(page-1,pageSize,sort);

        Page<Student> studentPage = studentRepository.findByStudents(studentList,pageable);

        List<StudentResponse> studentResponseList =
                studentPage.stream()
                        .map(this::mapToStudentResponse)
                        .toList();

        return PageResponse.<StudentResponse>builder()
                .currentPage(page)
                .pageSize(studentPage.getSize())
                .totalPages(studentPage.getTotalPages())
                .totalElements(studentPage.getTotalElements())
                .data(studentResponseList)
                .build();
    }

    public List<StudentResponse> getStudentByClassRoomNotPage(int classRoomId) {
        Sort sort = Sort.by("studentCode").ascending();
        List<Student> studentList = studentRepository.findAll(sort);
        return studentList.stream().map(this::mapToStudentResponse).toList();
    }

    public List<StudentResponse> getStudentNotClassRoom() {
        Set<Integer> studentClassRoomIds = studentClassRoomClient.getAllStudentId().getResult().stream()
                .map(StudentClassRoomResponse::getStudentId)
                .collect(Collectors.toSet());


        List<Student> studentsNotInClassRoom = studentRepository.findAll().stream()
                .filter(student -> !studentClassRoomIds.contains(student.getId()))
                .toList();

        return studentsNotInClassRoom.stream().map(student -> getStudentById(student.getId())).toList();
    }


    public StudentResponse getStudentById(int id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.STUDENT_NOT_EXISTED));
        return mapToStudentResponse(student);
    }

    public StudentResponse createStudent(int classRoomId, StudentCreationRequest request) {
        Student exitsStudent = studentRepository.findByStudentCode(request.getStudentCode());
        if(exitsStudent != null){
            throw new AppException(ErrorCode.STUDENT_CODE_EXISTED);
        }
        UserProfileCreationRequest userProfileCreationRequest =
                studentMapper.toUserProfileCreationRequest(request);

        userProfileCreationRequest.setUserType(UserType.student);

        UserProfileResponse userProfileResponse =
                profileClient.createProfile(userProfileCreationRequest).getResult();

        Student student = studentRepository.save(Student.builder()
                .studentCode(request.getStudentCode())
                .profileId(userProfileResponse.getId())
                .status(Status.ENROLLED)
                .build());

        studentClassRoomClient.addStudentIdInClassRoomId(student.getId(),classRoomId);

        return getStudentById(student.getId());
    }

    public void addStudentExisted(int classRoomId, int studentId) {
        studentClassRoomClient.addStudentIdInClassRoomId(studentId,classRoomId);
    }

    public void createStudentFromExcel(int classRoomId, List<StudentCreationRequest> request) {
        System.out.println(request);
        List<StudentClassRoomResponse> studentClassRoomResponseList =
                studentClassRoomClient.getStudentIdByClassRoomId(classRoomId).getResult();

        if(!CollectionUtils.isEmpty(studentClassRoomResponseList))
            throw new AppException(ErrorCode.STUDENT_EXISTED);

        List<String> requestStudentCodes = request.stream()
                .map(StudentCreationRequest::getStudentCode)
                .collect(Collectors.toList());

        List<String> existingStudentCodes = studentRepository.findStudentCodesByCodes(requestStudentCodes);

        if (!CollectionUtils.isEmpty(existingStudentCodes))
            throw new AppException(ErrorCode.STUDENT_CODE_EXISTED);

        for (StudentCreationRequest req : request){
            UserProfileCreationRequest userProfileCreationRequest =
                    studentMapper.toUserProfileCreationRequest(req);

            userProfileCreationRequest.setUserType(UserType.student);
            UserProfileResponse userProfileResponse =
                    profileClient.createProfile(userProfileCreationRequest).getResult();

            Student student = studentRepository.save(Student.builder()
                    .studentCode(req.getStudentCode())
                    .profileId(userProfileResponse.getId())
                    .status(Status.ENROLLED)
                    .build());

            studentClassRoomClient.addStudentIdInClassRoomId(student.getId(), classRoomId);
        }
    }

    public StudentResponse editStudent(int studentId, StudentEditRequest request) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new AppException(ErrorCode.STUDENT_NOT_EXISTED));

        student.setStatus(Status.valueOf(request.getStatus()));

        UserProfileCreationRequest userProfileCreationRequest =
                studentMapper.toUserProfileCreationRequest(request);

        UserProfileResponse userProfileResponse =
                profileClient.editProfile(student.getProfileId(),userProfileCreationRequest).getResult();


        StudentResponse teacherResponse = studentMapper.toStudentResponse(studentRepository.save(student));
        teacherResponse.setUserProfileResponse(userProfileResponse);

        return teacherResponse;
    }

    public void deleteStudent(int classRoomId, ArrayIdRequest request) {
        if(CollectionUtils.isEmpty(request.getArrId()))
            throw new AppException(ErrorCode.INVALID_REQUEST);

        for(Integer studentId : request.getArrId()){
            Student student = studentRepository.findById(studentId)
                    .orElseThrow(() -> new AppException(ErrorCode.STUDENT_NOT_EXISTED));

            studentClassRoomClient.deleteStudentIdInClassRoomId(student.getId(),classRoomId);

        }
    }



}
