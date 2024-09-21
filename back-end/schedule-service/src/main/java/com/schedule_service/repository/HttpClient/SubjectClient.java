package com.schedule_service.repository.HttpClient;

import com.schedule_service.Configuration.AuthenticationRequestInterceptor;
import com.schedule_service.dto.response.ApiResponse;
import com.schedule_service.dto.response.SubjectResponse;
import com.schedule_service.dto.response.TeacherResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "subject-service", url = "${app.services.subject}",
        configuration = {AuthenticationRequestInterceptor.class})
public interface SubjectClient {
    @GetMapping("/pl/subject/getById/{id}")
    ApiResponse<SubjectResponse> getById(@PathVariable int id);
}
