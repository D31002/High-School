package com.student_service.repository.HttpClient;

import com.student_service.Configuration.AuthenticationRequestInterceptor;
import com.student_service.dto.response.ApiResponse;
import com.student_service.dto.response.StudentClassRoomResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Set;

@FeignClient(name = "relationship-service", url = "${app.services.relationship}",
        configuration = {AuthenticationRequestInterceptor.class})
public interface StudentClassRoomClient {

      @GetMapping("/internal/studentClassRoom/getStudentIdByClassRoomId")
      ApiResponse<List<StudentClassRoomResponse>> getStudentIdByClassRoomId(@RequestParam int classRoomId);

      @GetMapping("/internal/studentClassRoom/getAllStudentId")
      ApiResponse<Set<StudentClassRoomResponse>> getAllStudentId();

      @PostMapping("/internal/studentClassRoom/addStudentIdInClassRoomId")
      ApiResponse<Void> addStudentIdInClassRoomId(@RequestParam int studentId, @RequestParam int classRoomId);

      @DeleteMapping("/internal/studentClassRoom/deleteStudentIdInClassRoomId")
      ApiResponse<Void> deleteStudentIdInClassRoomId(@RequestParam int studentId,@RequestParam int classRoomId);
}
