package com.profile_service.repository.HttpClient;

import com.profile_service.Configuration.AuthenticationRequestInterceptor;
import com.profile_service.dto.response.ApiResponse;
import com.profile_service.dto.response.TeacherResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "teacher-service", url = "${app.services.teacher}",
            configuration = {AuthenticationRequestInterceptor.class})
public interface TeacherClient {
    @GetMapping(value = "/internal/getTeacherByProfileId/{profileId}")
    ApiResponse<TeacherResponse> getTeacherByProfileId(@PathVariable int profileId);
}
