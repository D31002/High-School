package com.Relationship_Management_Service.controller;


import com.Relationship_Management_Service.dto.response.ApiResponse;
import com.Relationship_Management_Service.dto.response.StudentClassRoomResponse;
import com.Relationship_Management_Service.service.StudentClassRoomService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/pl")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class StudentClassRoomController {
    StudentClassRoomService studentClassRoomService;

    @GetMapping("/studentClassRoom/getStudentIdByClassRoomId")
    ApiResponse<List<StudentClassRoomResponse>> getStudentIdByClassRoomId(@RequestParam int classRoomId){
        List<StudentClassRoomResponse> result = studentClassRoomService.getStudentIdByClassRoomId(classRoomId);
        return ApiResponse.<List<StudentClassRoomResponse>>builder()
                .result(result)
                .build();
    }
}
