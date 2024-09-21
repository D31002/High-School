package com.attendance_service.service;

import com.attendance_service.dto.response.AttendanceStatusResponse;
import com.attendance_service.mapper.AttendanceStatusMapper;
import com.attendance_service.reponsitory.AttendanceRepository;
import com.attendance_service.reponsitory.AttendanceStatusRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class AttendanceStatusService {

    AttendanceStatusRepository attendanceStatusRepository;
    AttendanceStatusMapper attendanceStatusMapper;

    public List<AttendanceStatusResponse> getAllAttendanceStatus() {
        return attendanceStatusRepository.findAll().stream()
                .map(attendanceStatusMapper::toAttendanceStatusResponse).toList();
    }
}
