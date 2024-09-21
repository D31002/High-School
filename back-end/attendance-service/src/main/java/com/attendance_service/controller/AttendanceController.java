package com.attendance_service.controller;

import com.attendance_service.dto.request.AttendanceCreationRequest;
import com.attendance_service.dto.response.ApiResponse;
import com.attendance_service.dto.response.AttendanceResponse;
import com.attendance_service.service.AttendanceService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pl/attendance")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class AttendanceController {

    AttendanceService attendanceService;


    @GetMapping("/getAttendanceOfStudent")
    ApiResponse<List<AttendanceResponse>> getAttendanceOfStudent(
            @RequestParam int studentId,
            @RequestParam int classRoomId,
            @RequestParam int semesterId
    ){
        List<AttendanceResponse> result = attendanceService.getAttendanceOfStudent(studentId,classRoomId,semesterId);
        return ApiResponse.<List<AttendanceResponse>>builder()
                .result(result)
                .build();
    }

    @PreAuthorize("hasRole('PROCTOR')")
    @PostMapping("/createAttendance")
    ApiResponse<List<AttendanceResponse>> createAttendance(@RequestParam int classRoomId, @RequestParam int semesterId,
                                                           @RequestBody List<AttendanceCreationRequest> requests){
        List<AttendanceResponse> result = attendanceService.createAttendance(classRoomId,semesterId,requests);
        return ApiResponse.<List<AttendanceResponse>>builder().result(result).build();
    }


}
