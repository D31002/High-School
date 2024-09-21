package com.classRoom_service.repository.HttpClient;

import com.classRoom_service.Configuration.AuthenticationRequestInterceptor;
import com.classRoom_service.dto.response.ApiResponse;
import com.classRoom_service.dto.response.ClassRoomIdOfTeacherResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "schedule-service",url = "${app.services.schedule}",
        configuration = {AuthenticationRequestInterceptor.class})
public interface ScheduleClient {

    @GetMapping("/internal/teach/getClassRoomIdsOfTeacher")
    ApiResponse<List<ClassRoomIdOfTeacherResponse>> getClassRoomIdsOfTeacher(
            @RequestParam int teacherId,
            @RequestParam int schoolYearId);
}
