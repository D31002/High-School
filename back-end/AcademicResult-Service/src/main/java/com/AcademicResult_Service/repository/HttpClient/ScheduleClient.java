package com.AcademicResult_Service.repository.HttpClient;

import com.AcademicResult_Service.Configuration.AuthenticationRequestInterceptor;
import com.AcademicResult_Service.dto.response.ApiResponse;
import com.AcademicResult_Service.dto.response.SubjectResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "schedule-service",url = "${app.services.schedule}",
        configuration = {AuthenticationRequestInterceptor.class})
public interface ScheduleClient {

    @GetMapping("/pl/teach/getSubjectByTeacherAndClassRoom")
    ApiResponse<List<SubjectResponse>> getSubjectByTeacherAndClassRoom(@RequestParam int teacherId,
                                                                       @RequestParam int classRoomId);
}
