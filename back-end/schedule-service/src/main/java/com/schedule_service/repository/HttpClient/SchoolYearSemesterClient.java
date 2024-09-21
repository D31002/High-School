package com.schedule_service.repository.HttpClient;


import com.schedule_service.Configuration.AuthenticationRequestInterceptor;
import com.schedule_service.dto.response.ApiResponse;
import com.schedule_service.dto.response.SchoolYearResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@FeignClient(name = "SchoolYearSemester-service", url = "${app.services.year&semester}",
        configuration = {AuthenticationRequestInterceptor.class})
public interface SchoolYearSemesterClient {
    @GetMapping(value = "/internal/schoolYear/getSchoolYearBySchoolYearId/{SchoolYearId}")
    ApiResponse<SchoolYearResponse> getSchoolYearBySchoolYearId(@PathVariable int SchoolYearId);

}
