package com.student_service.repository.HttpClient;

import com.student_service.Configuration.AuthenticationRequestInterceptor;
import com.student_service.dto.request.UserProfileCreationRequest;
import com.student_service.dto.response.ApiResponse;
import com.student_service.dto.response.UserProfileResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name = "profile-service", url = "${app.services.profile}",
            configuration = {AuthenticationRequestInterceptor.class})
public interface ProfileClient {
    @GetMapping(value = "/internal/getProfileById/{id}")
    ApiResponse<UserProfileResponse> getProfileById(@PathVariable int id);

    @GetMapping("/internal/searchUserProfilesByFullName")
    ApiResponse<List<UserProfileResponse>> searchUserProfilesByFullName(@RequestParam(required = false) String keyword);

    @PostMapping("/internal/createProfile")
    ApiResponse<UserProfileResponse> createProfile(@RequestBody UserProfileCreationRequest request);

    @PutMapping("/internal/editProfile/{profileId}")
    ApiResponse<UserProfileResponse> editProfile(@PathVariable int profileId,
                                                 @RequestBody UserProfileCreationRequest request);

    @DeleteMapping("/internal/deleteProfile/{profileId}")
    ApiResponse<Void> deleteProfile(@PathVariable int profileId);
}
