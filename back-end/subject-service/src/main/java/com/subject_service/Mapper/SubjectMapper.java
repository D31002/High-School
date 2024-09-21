package com.subject_service.Mapper;

import com.subject_service.dto.response.SubjectResponse;
import com.subject_service.models.Subject;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SubjectMapper {
    SubjectResponse toSubjectResponse(Subject subject);
}
