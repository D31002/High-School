package com.parent_service.repository.HttpClient;

import com.parent_service.Configuration.AuthenticationRequestInterceptor;
import com.parent_service.dto.request.UserProfileCreationRequest;
import com.parent_service.dto.response.ApiResponse;
import com.parent_service.dto.response.UserProfileResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

@FeignClient(name = "profile-service", url = "${app.services.profile}",
            configuration = {AuthenticationRequestInterceptor.class})
public interface ProfileClient {
    @GetMapping(value = "/internal/getProfileById/{id}")
    ApiResponse<UserProfileResponse> getProfileById(@PathVariable int id);

    @PostMapping("/internal/createProfile")
    ApiResponse<UserProfileResponse> createProfile(@RequestBody UserProfileCreationRequest request);

    @PutMapping("/internal/editProfile/{profileId}")
    ApiResponse<UserProfileResponse> editProfile(
            @PathVariable int profileId,
            @RequestBody UserProfileCreationRequest request);

}
