package com.AcademicResult_Service.mapper;

import com.AcademicResult_Service.dto.response.CategoryResponse;
import com.AcademicResult_Service.models.Category;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    CategoryResponse toCategoryResponse(Category category);
}
