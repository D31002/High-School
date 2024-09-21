package com.AcademicResult_Service.repository.HttpClient;

import com.AcademicResult_Service.Configuration.AuthenticationRequestInterceptor;
import com.AcademicResult_Service.dto.response.ApiResponse;
import com.AcademicResult_Service.dto.response.SemesterResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(name = "SchoolYearSemester-service", url = "${app.services.year&semester}",
        configuration = {AuthenticationRequestInterceptor.class})
public interface SchoolYearSemesterClient {
    @GetMapping("/pl/semester/getAll")
    ApiResponse<List<SemesterResponse>> getAllSemester();
}
