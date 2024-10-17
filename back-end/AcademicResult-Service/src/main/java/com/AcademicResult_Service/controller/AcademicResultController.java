package com.AcademicResult_Service.controller;

import com.AcademicResult_Service.dto.request.AcademicCreationRequest;
import com.AcademicResult_Service.dto.request.AcademicPerformanceRequest;
import com.AcademicResult_Service.dto.request.AssessmentRequest;
import com.AcademicResult_Service.dto.response.*;
import com.AcademicResult_Service.service.AcademicResultService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/pl")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class AcademicResultController {

    AcademicResultService academicResultService;

    @PreAuthorize("hasRole('ADMIN') or hasRole('TEACHER')")
    @GetMapping("/getAll")
    ApiResponse<List<AcademicResultResponse>> getAll(
            @RequestParam(required = false) Integer classRoomId,
            @RequestParam(required = false) Integer semesterId
    ){
        List<AcademicResultResponse> result = academicResultService.getAll(classRoomId,semesterId);
        return ApiResponse.<List<AcademicResultResponse>>builder().result(result).build();
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('TEACHER')")
    @GetMapping("/getAllAcademicOfStudentOfClassRoom")
    ApiResponse<PageResponse<AcademicResultResponse>> getAllAcademicOfStudentOfClassRoom(
            @RequestParam int classRoomId,
            @RequestParam int semesterId,
            @RequestParam int subjectId,
            @RequestParam(required = false,defaultValue = "1") int page,
            @RequestParam(required = false,defaultValue = "7") int pageSize,
            @RequestParam(required = false) String keyword
    ){
        PageResponse<AcademicResultResponse> result =
                academicResultService.getAllAcademicOfStudentOfClassRoom(classRoomId,semesterId,subjectId,page,pageSize,keyword);
        return ApiResponse.<PageResponse<AcademicResultResponse>>builder().result(result).build();
    }

    @PreAuthorize("hasRole('STUDENT') or hasRole('ADMIN') or hasRole('TEACHER')")
    @GetMapping("/getAcademicOfStudent")
    ApiResponse<AcademicResultResponse> getAcademicOfStudent(
            @RequestParam int studentId,
            @RequestParam int classRoomId,
            @RequestParam int semesterId
    ){
        AcademicResultResponse result =
                academicResultService.getAcademicOfStudent(studentId,classRoomId,semesterId);
        return ApiResponse.<AcademicResultResponse>builder().result(result).build();
    }

    @PreAuthorize("hasRole('TEACHER')")
    @PostMapping("/createScoresOfStudent")
    ApiResponse<String> createScoresOfStudent(@RequestParam int teacherId,@RequestBody List<AcademicCreationRequest> requests){
        academicResultService.createScoresOfStudent(teacherId,requests);
        return ApiResponse.<String>builder().result("Thành công").build();
    }

    @GetMapping("/calculateMeanScoreSubject")
    ApiResponse<SubjectMeanScoreResponse> calculateMeanScoreSubject(
            @RequestParam int studentId,@RequestParam int classRoomId,
            @RequestParam int semesterId,@RequestParam int subjectId){
        SubjectMeanScoreResponse result =
                academicResultService.calculateMeanScoreSubject(studentId,classRoomId,semesterId,subjectId);
        return ApiResponse.<SubjectMeanScoreResponse>builder().result(result).build();
    }

    @GetMapping("/calculateMeanScoreSemester")
    ApiResponse<MeanScoreSemesterResponse> calculateMeanScoreSemester(
            @RequestParam int studentId,@RequestParam int classRoomId,
            @RequestParam int semesterId){
        MeanScoreSemesterResponse result =
                academicResultService.calculateMeanScoreSemester(studentId,classRoomId,semesterId);
        return ApiResponse.<MeanScoreSemesterResponse>builder().result(result).build();
    }

    @PreAuthorize("hasRole('TEACHER')")
    @PostMapping("/assessment")
    ApiResponse<String> assessment(@RequestBody List<AssessmentRequest> requests){
        academicResultService.assessment(requests);
        return ApiResponse.<String>builder().result("Thành công").build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/getAcademicResultsOfClassRoomAboveAverage")
    ApiResponse<List<AcademicResultResponse>> getAcademicResultsOfClassRoomAboveAverage(@RequestParam int classRoomId){
        List<AcademicResultResponse> result =
                academicResultService.getAcademicResultsOfClassRoomAboveAverage(classRoomId);
        return ApiResponse.<List<AcademicResultResponse>>builder().result(result).build();
    }

}
