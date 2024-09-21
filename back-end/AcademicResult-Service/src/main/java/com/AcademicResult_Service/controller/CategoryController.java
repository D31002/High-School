package com.AcademicResult_Service.controller;

import com.AcademicResult_Service.dto.response.ApiResponse;
import com.AcademicResult_Service.dto.response.CategoryResponse;
import com.AcademicResult_Service.service.CategoryService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/pl/category")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class CategoryController {

    CategoryService categoryService;

    @GetMapping("/getAll")
    ApiResponse<List<CategoryResponse>> getAll(){
        List<CategoryResponse> result =
                categoryService.getAll();

        return ApiResponse.<List<CategoryResponse>>builder().result(result).build();
    }
}
