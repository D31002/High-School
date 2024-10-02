package com.identity_service.controller;

import com.identity_service.dto.request.AuthenticationRequest;
import com.identity_service.dto.request.IntrospectRequest;
import com.identity_service.dto.request.LogoutRequest;
import com.identity_service.dto.request.RefreshRequest;
import com.identity_service.dto.response.ApiResponse;
import com.identity_service.dto.response.AuthenticationResponse;
import com.identity_service.dto.response.IntrospectResponse;
import com.identity_service.dto.response.RefreshResponse;
import com.identity_service.service.AuthenticationService;
import com.nimbusds.jose.JOSEException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@RestController
@RequestMapping("/pl/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Tag(name = "Authentication-Controller")
public class AuthenticationController {

    AuthenticationService authenticationService;

    @Operation(summary = "Login")
    @PostMapping("/login")
    ApiResponse<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request){
        AuthenticationResponse result = authenticationService.authenticate(request);
        return ApiResponse.<AuthenticationResponse>builder().result(result).build();
    }
    @Operation(summary = "Introspect")
    @PostMapping("/introspect")
    ApiResponse<IntrospectResponse> introspect(@RequestBody IntrospectRequest request)
            throws ParseException, JOSEException {
        var result = authenticationService.introspect(request);
        return ApiResponse.<IntrospectResponse>builder().result(result).build();
    }
    @Operation(summary = "Logout")
    @PostMapping("/logout")
    ApiResponse<Void> logout(@RequestBody LogoutRequest request) throws ParseException, JOSEException {
        authenticationService.logout(request);
        return ApiResponse.<Void>builder().build();
    }
    @Operation(summary = "Refresh Token")
    @PostMapping("/refresh")
    ApiResponse<RefreshResponse> refresh(@RequestBody RefreshRequest request)
            throws ParseException, JOSEException {
        RefreshResponse result = authenticationService.refreshToken(request);
        return ApiResponse.<RefreshResponse>builder().result(result).build();
    }
}
