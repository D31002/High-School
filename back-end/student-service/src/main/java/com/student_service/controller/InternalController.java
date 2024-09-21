package com.student_service.controller;

import com.student_service.dto.response.ApiResponse;
import com.student_service.dto.response.StudentResponse;
import com.student_service.service.StudentService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/internal")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class InternalController {

    StudentService studentService;

    @GetMapping("/getStudentByProfileId/{profileId}")
    ApiResponse<StudentResponse> getStudentByProfileId(@PathVariable int profileId){
        StudentResponse result = studentService.getStudentByProfileId(profileId);
        return ApiResponse.<StudentResponse>builder()
                .result(result)
                .build();
    }
}
