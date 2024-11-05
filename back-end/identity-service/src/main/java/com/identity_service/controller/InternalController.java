package com.identity_service.controller;

import com.identity_service.dto.request.UserCreationRequest;
import com.identity_service.dto.response.ApiResponse;
import com.identity_service.dto.response.UserResponse;
import com.identity_service.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/internal")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
@Tag(name = "Internal-Controller")
public class InternalController {

    UserService userService;

    @Operation(summary = "Get User By Id")
    @GetMapping("/getUserById/{id}")
    ApiResponse<UserResponse> getUserById(@PathVariable int id) {
        UserResponse result = userService.getUserById(id);
        return ApiResponse.<UserResponse>builder()
                .result(result)
                .build();
    }
    @Operation(summary = "Create User")
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/createUser")
    ApiResponse<UserResponse> createUser(@RequestBody UserCreationRequest request){
        UserResponse result = userService.createUser(request);
        return ApiResponse.<UserResponse>builder()
                .result(result)
                .build();
    }
    @Operation(summary = "Edit User By Id")
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/editUser/{userId}")
    ApiResponse<UserResponse> editUser(@PathVariable int userId,@RequestBody UserCreationRequest request){
        UserResponse result = userService.editUser(userId,request);
        return ApiResponse.<UserResponse>builder()
                .result(result)
                .build();
    }
    @Operation(summary = "Delete User By Id")
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/deleteUser/{userId}")
    ApiResponse<Void> deleteUser(@PathVariable int userId){
        userService.deleteUser(userId);
        return ApiResponse.<Void>builder().build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/setEnableWhenGraduation/{userId}")
    ApiResponse<Void> setEnableWhenGraduation(@PathVariable int userId){
        userService.setEnableWhenGraduation(userId);
        return ApiResponse.<Void>builder().build();
    }
}
