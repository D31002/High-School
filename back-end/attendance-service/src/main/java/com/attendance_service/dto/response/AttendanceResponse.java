package com.attendance_service.dto.response;

import com.attendance_service.models.AttendanceStatus;
import jakarta.persistence.ManyToOne;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AttendanceResponse {
    int id;

    Date date;

    int studentId;

    int semesterId;

    int classRoomId;

    SessionResponse session;

    AttendanceStatusResponse attendanceStatus;
}
