package com.schedule_service.repository.HttpClient;

import com.schedule_service.Configuration.AuthenticationRequestInterceptor;
import com.schedule_service.dto.response.ApiResponse;
import com.schedule_service.dto.response.TeacherSubjectResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "relationship-service", url = "${app.services.relationship}",
        configuration = {AuthenticationRequestInterceptor.class})
public interface TeacherSubjectClient {

    @GetMapping(value = "/internal/teacherSubject/getTeacherIdBySubjectId")
    ApiResponse<List<TeacherSubjectResponse>> getTeacherIdBySubjectId(@RequestParam int subjectId);
}
