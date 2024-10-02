package com.classRoom_service.repository.HttpClient;

import com.classRoom_service.Configuration.AuthenticationRequestInterceptor;
import com.classRoom_service.dto.response.ApiResponse;
import com.classRoom_service.dto.response.ArrClassRoomResponse;
import com.classRoom_service.dto.response.StudentClassRoomResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "relationship-service", url = "${app.services.relationship}",
            configuration = {AuthenticationRequestInterceptor.class})
public interface StudentClassRoomClient {

    @GetMapping("/internal/studentClassRoom/getClassRoomIdByStudentId")
    ApiResponse<List<ArrClassRoomResponse>> getClassRoomIdByStudentId(@RequestParam int studentId);

    @GetMapping("/pl/studentClassRoom/getStudentIdByClassRoomId")
    ApiResponse<List<StudentClassRoomResponse>> getStudentIdByClassRoomId(@RequestParam int classRoomId);
}
