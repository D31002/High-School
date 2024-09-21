package com.schoolYear_Semester_service.Mapper;

import com.schoolYear_Semester_service.Models.Semester;
import com.schoolYear_Semester_service.dto.response.SemesterResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SemesterMapper {
    SemesterResponse toSemesterResponse(Semester semester);
}
