package com.AcademicResult_Service.repository.HttpClient;

import com.AcademicResult_Service.Configuration.AuthenticationRequestInterceptor;
import com.AcademicResult_Service.dto.response.ApiResponse;
import com.AcademicResult_Service.dto.response.PageResponse;
import com.AcademicResult_Service.dto.response.StudentResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "student-service",url = "${app.services.student}",
        configuration = {AuthenticationRequestInterceptor.class})
public interface StudentClient {

    @GetMapping("/pl/getStudentById/{studentId}")
    ApiResponse<StudentResponse> getStudentById(@PathVariable int studentId);

    @GetMapping("/pl/getStudentENROLLEDByClassRoom")
    ApiResponse<PageResponse<StudentResponse>> getStudentENROLLEDByClassRoom(
            @RequestParam int classRoomId,
            @RequestParam(required = false,defaultValue = "1") int page,
            @RequestParam(required = false,defaultValue = "7") int pageSize,
            @RequestParam(required = false) String keyword);
}
