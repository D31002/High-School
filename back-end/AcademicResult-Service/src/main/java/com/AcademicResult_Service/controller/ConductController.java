package com.AcademicResult_Service.controller;

import com.AcademicResult_Service.dto.response.ApiResponse;
import com.AcademicResult_Service.dto.response.ConductResponse;
import com.AcademicResult_Service.service.ConductService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/pl/conduct")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class ConductController {

    ConductService conductService;

    @GetMapping("/getAll")
    ApiResponse<List<ConductResponse>> getAll(){
        List<ConductResponse> result =
                conductService.getAll();

        return ApiResponse.<List<ConductResponse>>builder().result(result).build();
    }
}
