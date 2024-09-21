package com.profile_service.Controller;

import com.profile_service.Exception.AppException;
import com.profile_service.Exception.ErrorCode;
import com.profile_service.dto.request.UserProfileCreationRequest;
import com.profile_service.dto.response.ApiResponse;
import com.profile_service.dto.response.StudentResponse;
import com.profile_service.dto.response.TeacherResponse;
import com.profile_service.dto.response.UserProfileResponse;
import com.profile_service.models.UserType;
import com.profile_service.service.UserProfileService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


@RestController
@RequestMapping("/pl")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class UserProfileController {
    UserProfileService userProfileService;

    @GetMapping("/getMyInFo")
    public ApiResponse<?> getMyInFo() {
        UserType userType = userProfileService.getUserTypeFromToken();

        return switch (userType) {
            case teacher -> {
                TeacherResponse teacherResponse = userProfileService.getTeacherInfo();
                yield ApiResponse.<TeacherResponse>builder()
                        .result(teacherResponse)
                        .build();
            }
            case student -> {
                StudentResponse studentResponse = userProfileService.getStudentInfo();
                yield ApiResponse.<StudentResponse>builder()
                        .result(studentResponse)
                        .build();
            }
            default -> throw new AppException(ErrorCode.INVALID_USER_TYPE);
        };
    }

    @PutMapping("/editProfile")
    ApiResponse<UserProfileResponse> editProfile(
            @RequestPart(value = "file", required = false) MultipartFile fileRequest,
            @RequestPart("request") UserProfileCreationRequest request) throws IOException {
        UserProfileResponse result = userProfileService.updateProfileByMyInfo(fileRequest,request);
        return ApiResponse.<UserProfileResponse>builder()
                .result(result)
                .build();
    }
}
