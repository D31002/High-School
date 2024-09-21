package com.schoolYear_Semester_service.controller;

import com.schoolYear_Semester_service.dto.response.ApiResponse;
import com.schoolYear_Semester_service.dto.response.SchoolYearResponse;
import com.schoolYear_Semester_service.dto.response.SemesterResponse;
import com.schoolYear_Semester_service.service.SemesterService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/pl/semester")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class SemesterController {

    SemesterService semesterService;

    @GetMapping("/getAll")
    public ApiResponse<List<SemesterResponse>> getAll(){
        List<SemesterResponse> result =  semesterService.getAll();
        return ApiResponse.<List<SemesterResponse>>builder()
                .result(result)
                .build();
    }

    @GetMapping("/getSemesterNow")
    public ApiResponse<SemesterResponse> getSemesterNow(){
        SemesterResponse result =  semesterService.getSemesterNow();
        return ApiResponse.<SemesterResponse>builder()
                .result(result)
                .build();
    }
}
