package com.schedule_service.controller;

import com.schedule_service.dto.request.DataEditRequest;
import com.schedule_service.dto.request.DataSaveSchedulesRequest;
import com.schedule_service.dto.response.ApiResponse;
import com.schedule_service.dto.response.SubjectResponse;
import com.schedule_service.dto.response.TeachDetailsResponse;
import com.schedule_service.dto.response.TeachResponse;
import com.schedule_service.service.TeachService;
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
public class TeachController {
	
	TeachService teachService;

    @GetMapping("/teach/getSchedulesBySchoolYearId/{schoolYearId}")
    ApiResponse<TeachResponse> getSchedulesBySchoolYearId(@PathVariable int schoolYearId){
        TeachResponse result = teachService.getSchedulesBySchoolYearId(schoolYearId);
        return ApiResponse.<TeachResponse>builder().result(result).build();
    }

    @PreAuthorize("hasRole('TEACHER') or hasRole('ADMIN')")
    @GetMapping("/teach/getSchedulesOfTeacherBySchoolYearId")
    ApiResponse<List<TeachDetailsResponse>> getSchedulesOfTeacherBySchoolYearId(
            @RequestParam int teacherId,
            @RequestParam int schoolYearId){
        List<TeachDetailsResponse> result =
                teachService.getSchedulesOfTeacherBySchoolYearId(teacherId,schoolYearId);
        return ApiResponse.<List<TeachDetailsResponse>>builder().result(result).build();
    }

    @PreAuthorize("hasRole('TEACHER')")
    @GetMapping("/teach/getSubjectByTeacherAndClassRoom")
    ApiResponse<List<SubjectResponse>> getSubjectByTeacherAndClassRoom(@RequestParam int teacherId,
                                                                       @RequestParam int classRoomId){
        List<SubjectResponse> result =
                teachService.getSubjectByTeacherAndClassRoom(teacherId,classRoomId);
        return ApiResponse.<List<SubjectResponse>>builder().result(result).build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/teach/generateSchedules")
    ApiResponse<TeachResponse> generateSchedules(@RequestParam int schoolYearId){
        TeachResponse result = teachService.generateSchedules(schoolYearId);
        return ApiResponse.<TeachResponse>builder().result(result).build();
    }
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/teach/generateSchedules1")
    ApiResponse<TeachResponse> generateSchedules1(@RequestParam int schoolYearId){
        TeachResponse result = teachService.generateSchedules1(schoolYearId);
        return ApiResponse.<TeachResponse>builder().result(result).build();
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/teach/saveSchedules")
    ApiResponse<List<TeachDetailsResponse>> saveSchedules(@RequestBody List<DataSaveSchedulesRequest> request){
        List<TeachDetailsResponse> result = teachService.saveSchedules(request);
        return ApiResponse.<List<TeachDetailsResponse>>builder().result(result).build();
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/teach/EditSchedules")
    ApiResponse<List<TeachDetailsResponse>> EditSchedules(@RequestBody DataEditRequest request){
        List<TeachDetailsResponse> result = teachService.EditSchedules(request);
        return ApiResponse.<List<TeachDetailsResponse>>builder().result(result).build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/teach/deleteSchedulesBySchoolYearId/{schoolYearId}")
    ApiResponse<String> deleteSchedulesBySchoolYearId(@PathVariable int schoolYearId){
        teachService.deleteSchedulesBySchoolYearId(schoolYearId);
        return ApiResponse.<String>builder().result("Thành công").build();
    }

}
