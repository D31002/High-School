package com.profile_service.repository.HttpClient;

import com.profile_service.Configuration.AuthenticationRequestInterceptor;
import com.profile_service.dto.response.ApiResponse;
import com.profile_service.dto.response.StudentResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "student-service", url = "${app.services.student}",
        configuration = {AuthenticationRequestInterceptor.class})
public interface StudentClient {
    @GetMapping("/internal/getStudentByProfileId/{profileId}")
    ApiResponse<StudentResponse> getStudentByProfileId(@PathVariable int profileId);
}
