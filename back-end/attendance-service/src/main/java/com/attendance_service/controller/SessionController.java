package com.attendance_service.controller;

import com.attendance_service.dto.response.ApiResponse;
import com.attendance_service.dto.response.AttendanceStatusResponse;
import com.attendance_service.dto.response.SessionResponse;
import com.attendance_service.service.AttendanceStatusService;
import com.attendance_service.service.SessionService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/pl/session")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class SessionController {

    SessionService sessionService;

    @GetMapping("/getAll")
    ApiResponse<List<SessionResponse>> getAllSession(){
        List<SessionResponse> result = sessionService.getAllSession();
        return ApiResponse.<List<SessionResponse>>builder().result(result).build();
    }


}
