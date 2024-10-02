package com.notification_service.repository.httpclient;

import com.notification_service.configuration.AuthenticationRequestInterceptor;
import com.notification_service.dto.response.ApiResponse;
import com.notification_service.dto.response.UserProfileResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "profile-service", url = "${app.services.profile}")
public interface ProfileClient {
    @GetMapping("/internal/getProfileById/{id}")
    ApiResponse<UserProfileResponse> getProfileById(@PathVariable Integer id);
}
