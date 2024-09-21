package com.subject_service.controller;

import com.subject_service.dto.response.ApiResponse;
import com.subject_service.dto.response.CombinationResponse;
import com.subject_service.service.CombinationService;
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
public class CombinationController {

    CombinationService combinationService;

    @GetMapping("/combination/getAll")
    ApiResponse<List<CombinationResponse>> getAllCombination(){
        List<CombinationResponse> result = combinationService.getAllCombination();
        return ApiResponse.<List<CombinationResponse>>builder()
                .result(result)
                .build();
    }

    @GetMapping("/combination/getById")
    ApiResponse<CombinationResponse> getById(@RequestParam int combinationId){
        CombinationResponse result = combinationService.getCombinationById(combinationId);
        return ApiResponse.<CombinationResponse>builder()
                .result(result)
                .build();
    }
}
