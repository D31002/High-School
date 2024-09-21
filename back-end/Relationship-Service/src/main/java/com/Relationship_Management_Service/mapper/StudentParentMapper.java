package com.Relationship_Management_Service.mapper;

import com.Relationship_Management_Service.dto.response.ArrParentResponse;
import com.Relationship_Management_Service.models.StudentParent;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface StudentParentMapper {
    ArrParentResponse toArrParentResponse(StudentParent studentParent);
}
