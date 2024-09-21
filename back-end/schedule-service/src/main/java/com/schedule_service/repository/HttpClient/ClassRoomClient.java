package com.schedule_service.repository.HttpClient;

import com.schedule_service.Configuration.AuthenticationRequestInterceptor;
import com.schedule_service.dto.response.ApiResponse;
import com.schedule_service.dto.response.ClassEntityResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "classRoom-service", url = "${app.services.classRoom}",
        configuration = {AuthenticationRequestInterceptor.class})
public interface ClassRoomClient {

    @GetMapping("/pl/getById/{Id}")
    ApiResponse<ClassEntityResponse> getById(@PathVariable int Id);

    @GetMapping("/pl/getAllBySchoolYearNotPagination")
    ApiResponse<List<ClassEntityResponse>> getAllBySchoolYearNotPagination(
            @RequestParam int schoolYearId);
}
