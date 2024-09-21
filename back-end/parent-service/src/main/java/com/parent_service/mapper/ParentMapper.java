package com.parent_service.mapper;

import com.parent_service.dto.response.ParentResponse;
import com.parent_service.models.Parent;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ParentMapper {
    ParentResponse toParentResponse(Parent parent);
}
