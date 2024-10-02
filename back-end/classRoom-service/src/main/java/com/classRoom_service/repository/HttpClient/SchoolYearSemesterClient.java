package com.classRoom_service.repository.HttpClient;

import com.classRoom_service.dto.response.ApiResponse;
import com.classRoom_service.dto.response.SchoolYearResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "SchoolYearSemester-service", url = "${app.services.year&semester}")
public interface SchoolYearSemesterClient {
    @GetMapping(value = "/internal/schoolYear/getSchoolYearBySchoolYearId/{SchoolYearId}")
    ApiResponse<SchoolYearResponse> getSchoolYearBySchoolYearId(@PathVariable int SchoolYearId);

    @GetMapping(value = "/internal/schoolYear/getSchoolYearBySchoolYear")
    ApiResponse<SchoolYearResponse> getSchoolYearBySchoolYear(@RequestParam int schoolYear);
}
