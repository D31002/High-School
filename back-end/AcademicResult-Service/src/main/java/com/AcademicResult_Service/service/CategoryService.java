package com.AcademicResult_Service.service;

import com.AcademicResult_Service.dto.response.CategoryResponse;
import com.AcademicResult_Service.mapper.CategoryMapper;
import com.AcademicResult_Service.repository.CategoryRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class CategoryService {

    CategoryRepository categoryRepository;
    CategoryMapper categoryMapper;

    public List<CategoryResponse> getAll() {
        return categoryRepository.findAll().stream().map(categoryMapper::toCategoryResponse).toList();

    }
}
