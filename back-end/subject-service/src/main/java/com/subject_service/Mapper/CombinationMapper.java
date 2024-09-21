package com.subject_service.Mapper;

import com.subject_service.dto.response.CombinationResponse;
import com.subject_service.models.Combination;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CombinationMapper {
    @Mapping(target = "subjects", ignore = true)
    CombinationResponse toCombinationResponse(Combination combination);
}
