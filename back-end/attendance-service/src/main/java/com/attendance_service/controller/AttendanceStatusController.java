package com.attendance_service.controller;

import com.attendance_service.dto.response.ApiResponse;
import com.attendance_service.dto.response.AttendanceStatusResponse;
import com.attendance_service.service.AttendanceService;
import com.attendance_service.service.AttendanceStatusService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/pl/status")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class AttendanceStatusController {

    AttendanceStatusService attendanceStatusService;

    @GetMapping("/getAll")
    ApiResponse<List<AttendanceStatusResponse>> getAllAttendanceStatus(){
        List<AttendanceStatusResponse> result = attendanceStatusService.getAllAttendanceStatus();
        return ApiResponse.<List<AttendanceStatusResponse>>builder().result(result).build();
    }


}
