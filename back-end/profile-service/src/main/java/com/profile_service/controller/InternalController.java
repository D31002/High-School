package com.profile_service.controller;

import com.profile_service.dto.request.UserProfileCreationRequest;
import com.profile_service.dto.response.ApiResponse;
import com.profile_service.dto.response.UserProfileResponse;
import com.profile_service.models.UserProfile;
import com.profile_service.service.UserProfileService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/internal")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class InternalController {
    UserProfileService userProfileService;

    @GetMapping("/getProfileById/{id}")
    ApiResponse<UserProfileResponse> getProfileById(@PathVariable Integer id){
        UserProfileResponse result = userProfileService.getProfileById(id);
        return ApiResponse.<UserProfileResponse>builder()
                .result(result)
                .build();
    }

    @GetMapping("/getUserID/{userprofileId}")
    ApiResponse<Integer> getUserID(@PathVariable Integer userprofileId){
        Integer result = userProfileService.getUserID(userprofileId);
        return ApiResponse.<Integer>builder()
                .result(result)
                .build();
    }

    @GetMapping("/searchUserProfilesByFullName")
    ApiResponse<List<UserProfileResponse>> searchUserProfilesByFullName(
            @RequestParam(required = false) String keyword){
        List<UserProfileResponse> result = userProfileService.searchUserProfilesByFullName(keyword);
        return ApiResponse.<List<UserProfileResponse>>builder()
                .result(result)
                .build();
    }

    @PostMapping("/createProfile")
    ApiResponse<UserProfileResponse> createProfile(@RequestBody UserProfileCreationRequest request){
        UserProfileResponse result = userProfileService.createProfile(request);
        return ApiResponse.<UserProfileResponse>builder()
                .result(result)
                .build();
    }

    @PutMapping("/editProfile/{profileId}")
    ApiResponse<UserProfileResponse> editProfile(
            @PathVariable int profileId,
            @RequestBody UserProfileCreationRequest request){
        UserProfileResponse result = userProfileService.editProfile(profileId,request);
        return ApiResponse.<UserProfileResponse>builder()
                .result(result)
                .build();
    }

    @DeleteMapping("/deleteProfile/{profileId}")
    ApiResponse<Void> deleteProfile(@PathVariable int profileId){
        userProfileService.deleteProfile(profileId);
        return ApiResponse.<Void>builder().build();
    }


}
