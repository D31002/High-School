package com.schoolYear_Semester_service.controller;

import com.schoolYear_Semester_service.dto.response.ApiResponse;
import com.schoolYear_Semester_service.dto.response.SchoolYearResponse;
import com.schoolYear_Semester_service.service.SchoolYearService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/internal")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class internalController {

    SchoolYearService schoolYearService;

    @GetMapping("/schoolYear/getSchoolYearBySchoolYearId/{SchoolYearId}")
    public ApiResponse<SchoolYearResponse> getSchoolYearBySchoolYearId(@PathVariable int SchoolYearId){
        SchoolYearResponse result =  schoolYearService.getBySchoolYearId(SchoolYearId);
        return ApiResponse.<SchoolYearResponse>builder()
                .result(result)
                .build();
    }
    @GetMapping("/schoolYear/getSchoolYearBySchoolYear")
    public ApiResponse<SchoolYearResponse> getSchoolYearBySchoolYear(@RequestParam int schoolYear){
        SchoolYearResponse result =  schoolYearService.getSchoolYearBySchoolYear(schoolYear);
        return ApiResponse.<SchoolYearResponse>builder()
                .result(result)
                .build();
    }

}
