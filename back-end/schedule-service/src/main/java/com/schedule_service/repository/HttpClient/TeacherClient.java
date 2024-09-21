package com.schedule_service.repository.HttpClient;

import com.schedule_service.Configuration.AuthenticationRequestInterceptor;
import com.schedule_service.dto.response.ApiResponse;
import com.schedule_service.dto.response.TeacherResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "teacher-service", url = "${app.services.teacher}",
        configuration = {AuthenticationRequestInterceptor.class})
public interface TeacherClient {
    @GetMapping("/pl/getTeacherById/{id}")
    ApiResponse<TeacherResponse> getTeacherById(@PathVariable int id);
}
