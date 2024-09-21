package com.classRoom_service.repository.HttpClient;

import com.classRoom_service.Configuration.AuthenticationRequestInterceptor;
import com.classRoom_service.dto.response.ApiResponse;
import com.classRoom_service.dto.response.CombinationResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "subject-service", url = "${app.services.subject}",
        configuration = {AuthenticationRequestInterceptor.class})
public interface SubjectClient {
    @GetMapping(value = "/pl/combination/getById")
    ApiResponse<CombinationResponse> getById(@RequestParam int combinationId);
}
