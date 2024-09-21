package com.AcademicResult_Service.mapper;

import com.AcademicResult_Service.dto.response.StudentResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AcademicResultMapper {
    StudentResponse toStudentResponse(Object object);
}
