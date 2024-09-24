package com.AcademicResult_Service.mapper;

import com.AcademicResult_Service.dto.response.AcademicResultResponse;
import com.AcademicResult_Service.dto.response.StudentResponse;
import com.AcademicResult_Service.models.AcademicResult;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AcademicResultMapper {
    StudentResponse toStudentResponse(Object object);

    AcademicResultResponse toAcademicResultResponse(AcademicResult academicResult);
}
