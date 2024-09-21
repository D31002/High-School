package com.classRoom_service.Mapper;

import com.classRoom_service.Models.ClassEntity;
import com.classRoom_service.dto.request.ClassEntityRequest;
import com.classRoom_service.dto.response.ClassEntityResponse;
import org.mapstruct.Mapper;

import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ClassEntityMapper {
    ClassEntityResponse toClassEntityResponse(ClassEntity classEntity);
    void updateClassEntity(@MappingTarget ClassEntity classEntity, ClassEntityRequest request);
}
