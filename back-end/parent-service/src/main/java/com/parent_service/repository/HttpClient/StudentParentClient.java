package com.parent_service.repository.HttpClient;

import com.parent_service.Configuration.AuthenticationRequestInterceptor;
import com.parent_service.dto.response.ApiResponse;
import com.parent_service.dto.response.ArrParentResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "relationship-service", url = "${app.services.relationship}",
        configuration = {AuthenticationRequestInterceptor.class})
public interface StudentParentClient {
      @PostMapping("/internal/studentParent/addStudentAndParent")
      ApiResponse<Void> addStudentAndParent(@RequestParam int studentId, @RequestParam int parentId);

      @GetMapping("/internal/studentParent/getParentOfStudent")
      ApiResponse<List<ArrParentResponse>> getParentOfStudent(@RequestParam int studentId);
}
