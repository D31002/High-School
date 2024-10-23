package com.identity_service.repository.httpClient;


import com.identity_service.dto.response.ApiResponse;
import com.identity_service.dto.response.UserProfileResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@FeignClient(name = "profile-service", url = "${app.services.profile}")
public interface ProfileClient {
    @GetMapping("/internal/getProfileByUserId/{userId}")
    ApiResponse<UserProfileResponse> getProfileByUserId(@PathVariable Integer userId);
}
