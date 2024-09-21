package com.parent_service.controller;

import com.parent_service.dto.request.ParentCreationRequest;
import com.parent_service.dto.response.ApiResponse;
import com.parent_service.dto.response.ParentResponse;
import com.parent_service.service.ParentService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/internal")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class InternalController {
    ParentService parentService;

    @PostMapping("/createParent")
    ApiResponse<List<ParentResponse>> createParent(
            @RequestParam int studentId,
            @RequestBody ParentCreationRequest request){

        List<ParentResponse> result = parentService.createParent(studentId,request);
        return ApiResponse.<List<ParentResponse>>builder()
                .result(result)
                .build();
    }
}
