package com.attendance_service.mapper;

import com.attendance_service.dto.response.AttendanceStatusResponse;
import com.attendance_service.models.AttendanceStatus;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AttendanceStatusMapper {
    AttendanceStatusResponse toAttendanceStatusResponse(AttendanceStatus attendanceStatus);
}
