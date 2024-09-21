package com.attendance_service.mapper;

import com.attendance_service.dto.response.SessionResponse;
import com.attendance_service.models.Session;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SessionMapper {
    SessionResponse toSessionResponse(Session session);
}
