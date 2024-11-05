package com.student_service.repository.HttpClient;

import com.student_service.Configuration.AuthenticationRequestInterceptor;
import com.student_service.dto.request.UserProfileCreationRequest;
import com.student_service.dto.response.ApiResponse;
import com.student_service.dto.response.UserProfileResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name = "identity-service", url = "${app.services.identity}",
            configuration = {AuthenticationRequestInterceptor.class})
public interface IdentityClient {
    @PostMapping("/internal/setEnableWhenGraduation/{userId}")
    ApiResponse<Void> setEnableWhenGraduation(@PathVariable int userId);
}
