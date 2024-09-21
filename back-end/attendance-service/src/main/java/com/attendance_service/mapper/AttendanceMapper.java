package com.attendance_service.mapper;

import com.attendance_service.dto.response.AttendanceResponse;
import com.attendance_service.models.Attendance;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AttendanceMapper {
    AttendanceResponse toAttendanceResponse(Attendance attendance);
}
