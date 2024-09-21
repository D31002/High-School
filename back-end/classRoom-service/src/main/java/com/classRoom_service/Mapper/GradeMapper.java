package com.classRoom_service.Mapper;

import com.classRoom_service.Models.Grade;
import com.classRoom_service.dto.response.GradeResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface GradeMapper {
    GradeResponse toGradeResponse(Grade grade);
}
