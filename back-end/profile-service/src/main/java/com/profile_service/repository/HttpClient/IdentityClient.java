package com.profile_service.repository.HttpClient;


import com.profile_service.Configuration.AuthenticationRequestInterceptor;
import com.profile_service.dto.request.UserCreationRequest;
import com.profile_service.dto.response.ApiResponse;
import com.profile_service.dto.response.UserResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

@FeignClient(name = "identity-service", url = "${app.services.identity}"
        ,configuration = {AuthenticationRequestInterceptor.class})
public interface IdentityClient {
    @GetMapping(value = "/internal/getUserById/{id}")
    ApiResponse<UserResponse> getUserById(@PathVariable int id);

    @PostMapping(value = "/internal/createUser")
    ApiResponse<UserResponse> createUser(@RequestBody UserCreationRequest request);

    @PutMapping("/internal/editUser/{userId}")
    ApiResponse<UserResponse> editUser(@PathVariable int userId,@RequestBody UserCreationRequest request);

    @DeleteMapping("/internal/deleteUser/{userId}")
    ApiResponse<Void> deleteUser(@PathVariable int userId);
}
