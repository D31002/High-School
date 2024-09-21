package com.parent_service.controller;

import com.parent_service.dto.response.ApiResponse;
import com.parent_service.dto.response.ParentResponse;
import com.parent_service.service.ParentService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/pl")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class ParentController {
    ParentService parentService;

    @PreAuthorize("hasRole('ADMIN') or hasRole('STUDENT')")
    @GetMapping("/getAllParentOfStudent")
    ApiResponse<List<ParentResponse>> getAllParentOfStudent(@RequestParam int studentId){
        List<ParentResponse> result = parentService.getAllParentOfStudent(studentId);
        return ApiResponse.<List<ParentResponse>>builder().result(result).build();
    }
}
