package com.schedule_service.Mapper;

import com.schedule_service.dto.request.AssignedLesson;
import com.schedule_service.dto.response.ClassRoomIdOfTeacherResponse;
import com.schedule_service.dto.response.TeachResponse;
import com.schedule_service.models.Teach;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TeachMapper {

    @Mapping(target = "lesson", ignore = true)
    TeachResponse toTeachResponse(Teach teach);

    ClassRoomIdOfTeacherResponse toClassRoomIdOfTeacherResponse(Integer classRoomId);
}
