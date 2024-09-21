package com.AcademicResult_Service.repository.HttpClient;

import com.AcademicResult_Service.Configuration.AuthenticationRequestInterceptor;
import com.AcademicResult_Service.dto.response.ApiResponse;
import com.AcademicResult_Service.dto.response.ClassEntityResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "classRoom-service",url = "${app.services.classRoom}",
        configuration = {AuthenticationRequestInterceptor.class})
public interface ClassRoomClient {
    @GetMapping("/pl/getById/{Id}")
    ApiResponse<ClassEntityResponse> getById(@PathVariable int Id);
}
