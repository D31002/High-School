package com.schoolYear_Semester_service.controller;

import com.schoolYear_Semester_service.dto.response.ApiResponse;
import com.schoolYear_Semester_service.dto.response.SchoolYearResponse;
import com.schoolYear_Semester_service.service.SchoolYearService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pl/schoolYear")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class SchoolYearController {

    SchoolYearService schoolYearService;

    @GetMapping("/getAll")
    public ApiResponse<List<SchoolYearResponse>> getAll(@RequestParam(required = false) String keyword){
        List<SchoolYearResponse> result =  schoolYearService.getAll(keyword);
        return ApiResponse.<List<SchoolYearResponse>>builder()
                .result(result)
                .build();
    }
}
