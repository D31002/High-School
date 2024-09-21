package com.AcademicResult_Service.repository.HttpClient;

import com.AcademicResult_Service.Configuration.AuthenticationRequestInterceptor;
import com.AcademicResult_Service.dto.response.ApiResponse;
import com.AcademicResult_Service.dto.response.StudentResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(name = "profile-service",url = "${app.services.profile}",
        configuration = {AuthenticationRequestInterceptor.class})
public interface ProfileClient {
    @GetMapping("/pl/getMyInFo")
    ApiResponse<StudentResponse> getMyInFo();
}
