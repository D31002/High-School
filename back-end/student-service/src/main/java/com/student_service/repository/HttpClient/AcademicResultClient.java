package com.student_service.repository.HttpClient;

import com.student_service.Configuration.AuthenticationRequestInterceptor;
import com.student_service.dto.response.AcademicResultResponse;
import com.student_service.dto.response.ApiResponse;
import com.student_service.dto.response.StudentClassRoomResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Set;

@FeignClient(name = "AcademicResult-service", url = "${app.services.academicResult}",
        configuration = {AuthenticationRequestInterceptor.class})
public interface AcademicResultClient {

      @GetMapping("/pl/getAcademicResultsOfClassRoomAboveAverage")
      ApiResponse<List<AcademicResultResponse>> getAcademicResultsOfClassRoomAboveAverage(@RequestParam int classRoomId);
}
