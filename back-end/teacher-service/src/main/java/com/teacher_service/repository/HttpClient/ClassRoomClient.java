package com.teacher_service.repository.HttpClient;


import com.teacher_service.Configuration.AuthenticationRequestInterceptor;
import com.teacher_service.dto.response.ApiResponse;
import com.teacher_service.dto.response.ClassEntityResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "classRoom-service", url = "${app.services.classRoom}",
            configuration = {AuthenticationRequestInterceptor.class})
public interface ClassRoomClient {
    @GetMapping("/getClassRoomByClassTeacher")
    ApiResponse<ClassEntityResponse> getClassRoomByClassTeacher(
            @RequestParam int classTeacherId,
            @RequestParam int schoolYearId
    );
}
