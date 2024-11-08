package com.student_service.service;

import com.student_service.Exception.AppException;
import com.student_service.Exception.ErrorCode;
import com.student_service.dto.request.ArrayIdRequest;
import com.student_service.dto.request.StudentCreationRequest;
import com.student_service.dto.request.StudentEditRequest;
import com.student_service.dto.request.UserProfileCreationRequest;
import com.student_service.dto.response.*;
import com.student_service.mapper.StudentMapper;
import com.student_service.models.Status;
import com.student_service.models.Student;
import com.student_service.models.UserType;
import com.student_service.repository.HttpClient.AcademicResultClient;
import com.student_service.repository.HttpClient.IdentityClient;
import com.student_service.repository.HttpClient.ProfileClient;
import com.student_service.repository.HttpClient.StudentClassRoomClient;
import com.student_service.repository.StudentRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.Comparator;
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
    ExcelService excelService;
    AcademicResultClient academicResultClient;
    IdentityClient identityClient;

    private StudentResponse mapToStudentResponse(Student student){
        UserProfileResponse userProfileResponse = profileClient.getProfileById(student.getProfileId()).getResult();
        StudentResponse studentResponse = studentMapper.toStudentResponse(student);
        studentResponse.setUserProfileResponse(userProfileResponse);
        String vietnameseStatus = student.getStatus().getVietnameseName();
        studentResponse.setStatus(vietnameseStatus);
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

    public PageResponse<StudentResponse> getStudentENROLLEDByClassRoom(
            int classRoomId, int page, int pageSize, String keyword) {
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
                .filter(student -> userProfileStudentIds.contains(student.getProfileId()) && student.getStatus() == Status.ENROLLED)
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
        List<StudentClassRoomResponse> studentClassRoomResponseList =
                studentClassRoomClient.getStudentIdByClassRoomId(classRoomId).getResult();

        List<Student> studentList = studentClassRoomResponseList.stream()
                .map(studentClassRoomResponse -> studentRepository.findById(studentClassRoomResponse.getStudentId())
                        .orElseThrow(() -> new AppException(ErrorCode.STUDENT_NOT_EXISTED)))
                .sorted(Comparator.comparing(Student::getStudentCode))
                .toList();

        return studentList.stream().map(student -> {
            UserProfileResponse userProfileResponse = profileClient.getProfileById(student.getProfileId()).getResult();
            StudentResponse studentResponse = studentMapper.toStudentResponse(student);
            studentResponse.setUserProfileResponse(userProfileResponse);
            return studentResponse;
        }).toList();
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

    public void createStudentFromExcel(int classRoomId, MultipartFile file) throws IOException {
        List<StudentCreationRequest> request = excelService.getStudentsDataFromExcel(file.getInputStream());

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

        Status status = Status.mapVietnameseStatusToEnum(request.getStatus());
        student.setStatus(status);

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


    public ResponseEntity<Resource> exportStudentDataToExcel(int classRoomId) {
        List<StudentResponse> studentResponseList = getStudentByClassRoomNotPage(classRoomId);

        ByteArrayInputStream byteArrayInputStream = excelService.DownDataExcel(studentResponseList);
        InputStreamResource file =new InputStreamResource(byteArrayInputStream);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"hocSinh.xlsx\"")
                .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(file);

    }

    public List<StudentResponse> AddStudentsHasAcademicResultAboveAverageFromOldYear(
            int classRoomIdOld,int classRoomIdNew) {

        List<StudentClassRoomResponse> studentClassRoomResponseList =
                studentClassRoomClient.getStudentIdByClassRoomId(classRoomIdNew).getResult();

        if(!CollectionUtils.isEmpty(studentClassRoomResponseList))
            throw new AppException(ErrorCode.STUDENT_EXISTED);

        List<AcademicResultResponse> academicResults =
                academicResultClient.getAcademicResultsOfClassRoomAboveAverage(classRoomIdOld).getResult();

        if (CollectionUtils.isEmpty(academicResults)) {
            throw new AppException(ErrorCode.STUDENT_ABOVE_AVERAGE_NOT_EXISTED);
        }
        return academicResults.stream()
                .peek(result -> studentClassRoomClient.addStudentIdInClassRoomId(result.getStudentId(), classRoomIdNew))
                .map(result -> getStudentById(result.getStudentId()))
                .toList();
    }

    public void graduationAssessment(ArrayIdRequest request) {

        for (Integer studentId : request.getArrId()){
            Student student = studentRepository.findById(studentId)
                            .orElseThrow(() -> new AppException(ErrorCode.STUDENT_NOT_EXISTED));
            student.setStatus(Status.GRADUATED);
            Integer userId = profileClient.getUserID(student.getProfileId()).getResult();
            identityClient.setEnableWhenGraduation(userId);
            studentRepository.save(student);
        }
    }


}
