package com.profile_service.repository.HttpClient;

import com.profile_service.Configuration.AuthenticationRequestInterceptor;
import com.profile_service.dto.request.ParentCreationRequest;
import com.profile_service.dto.response.ApiResponse;
import com.profile_service.dto.response.ParentResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name = "parent-service", url = "${app.services.parent}",
        configuration = {AuthenticationRequestInterceptor.class})
public interface ParentClient {
    @PostMapping("/internal/createParent")
    ApiResponse<List<ParentResponse>> createParent(
            @RequestParam int studentId,
            @RequestBody ParentCreationRequest request);
}
