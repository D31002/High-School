package com.teacher_service.repository.HttpClient;

import com.teacher_service.Configuration.AuthenticationRequestInterceptor;
import com.teacher_service.dto.response.ApiResponse;
import com.teacher_service.dto.response.ArrSubjectResponse;
import com.teacher_service.dto.response.TeacherSubjectResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "relationship-service", url = "${app.services.relationship}",
        configuration = {AuthenticationRequestInterceptor.class})
public interface TeacherSubjectClient {

    @GetMapping(value = "/internal/teacherSubject/getTeacherIdBySubjectId")
    ApiResponse<List<TeacherSubjectResponse>> getTeacherIdBySubjectId(@RequestParam int subjectId);

    @GetMapping("/internal/teacherSubject/getSubjectIdByTeacherId")
    ApiResponse<List<ArrSubjectResponse>> getSubjectIdByTeacherId(@RequestParam int teacherId);

    @PostMapping("/internal/teacherSubject/addTeacherIdInSubjectId")
    ApiResponse<Void> addTeacherIdInSubjectId(@RequestParam int teacherId,@RequestParam int subjectId);

    @DeleteMapping("/internal/teacherSubject/deleteTeacherIdInSubjectId")
    ApiResponse<Void> deleteTeacherIdInSubjectId(@RequestParam int teacherId,@RequestParam int subjectId);
}
