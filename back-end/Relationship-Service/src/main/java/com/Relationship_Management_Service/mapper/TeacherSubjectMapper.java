package com.Relationship_Management_Service.mapper;

import com.Relationship_Management_Service.dto.response.ArrSubjectResponse;
import com.Relationship_Management_Service.dto.response.TeacherSubjectResponse;
import com.Relationship_Management_Service.models.TeacherSubject;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TeacherSubjectMapper {
    TeacherSubjectResponse toTeacherSubjectResponse(TeacherSubject teacherSubject);
    ArrSubjectResponse toArrSubjectResponse(TeacherSubject teacherSubject);
}
