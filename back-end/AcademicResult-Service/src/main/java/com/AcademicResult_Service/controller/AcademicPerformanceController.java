package com.AcademicResult_Service.controller;

import com.AcademicResult_Service.dto.response.AcademicPerformanceResponse;
import com.AcademicResult_Service.dto.response.ApiResponse;
import com.AcademicResult_Service.service.AcademicPerformanceService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/pl/academicPerformance")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class AcademicPerformanceController {

    AcademicPerformanceService academicPerformanceService;

    @GetMapping("/getAll")
    ApiResponse<List<AcademicPerformanceResponse>> getAll(){
        List<AcademicPerformanceResponse> result =
                academicPerformanceService.getAll();

        return ApiResponse.<List<AcademicPerformanceResponse>>builder().result(result).build();
    }
}
