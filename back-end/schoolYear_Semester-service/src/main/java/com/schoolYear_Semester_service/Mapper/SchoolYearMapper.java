package com.schoolYear_Semester_service.Mapper;

import com.schoolYear_Semester_service.Models.SchoolYear;
import com.schoolYear_Semester_service.dto.response.SchoolYearResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SchoolYearMapper {
    SchoolYearResponse toSchoolYearResponse(SchoolYear schoolYear);
}
