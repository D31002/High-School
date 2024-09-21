package com.schedule_service.Mapper;

import com.schedule_service.dto.response.LessonResponse;
import com.schedule_service.models.Lesson;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface LessonMapper {
    LessonResponse toLessonResponse(Lesson lesson);
}
