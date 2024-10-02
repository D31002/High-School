package com.notification_service.repository.httpclient;


import com.notification_service.dto.response.ApiResponse;
import com.notification_service.dto.response.IntrospectResponse;
import com.notification_service.dto.request.IntrospectRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "identity-service", url = "${app.services.identity}")
public interface IdentityClient {
    @PostMapping("/pl/auth/introspect")
    ApiResponse<IntrospectResponse> introspect(@RequestBody IntrospectRequest request);
}
