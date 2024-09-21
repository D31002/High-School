package com.attendance_service.service;

import com.attendance_service.Exception.AppException;
import com.attendance_service.Exception.ErrorCode;
import com.attendance_service.dto.request.AttendanceCreationRequest;
import com.attendance_service.dto.response.AttendanceResponse;
import com.attendance_service.mapper.AttendanceMapper;
import com.attendance_service.models.Attendance;
import com.attendance_service.models.AttendanceStatus;
import com.attendance_service.models.Session;
import com.attendance_service.reponsitory.AttendanceRepository;
import com.attendance_service.reponsitory.AttendanceStatusRepository;
import com.attendance_service.reponsitory.SessionRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class AttendanceService {

    AttendanceRepository attendanceRepository;
    AttendanceStatusRepository attendanceStatusRepository;
    SessionRepository sessionRepository;
    AttendanceMapper attendanceMapper;


    public List<AttendanceResponse> getAttendanceOfStudent(
            int studentId, int classRoomId, int semesterId) {

        List<Attendance> attendanceList =
                attendanceRepository.findByStudentIdAndClassRoomIdAndSemesterId(studentId,classRoomId,semesterId);

        return attendanceList.stream()
                .map(attendanceMapper::toAttendanceResponse).toList();
    }



    public List<AttendanceResponse> createAttendance(int classRoomId,
                                                     int semesterId,
                                                     List<AttendanceCreationRequest> requests) {
        LocalDate today = LocalDate.now();

        List<Attendance> attendanceList = requests.stream()
                .map(request -> {
                    Session session = sessionRepository.findById(request.getSessionId())
                            .orElseThrow(() -> new AppException(ErrorCode.SESSION_NOT_EXISTED));

                    AttendanceStatus attendanceStatus = attendanceStatusRepository.findById(request.getStatusId())
                            .orElseThrow(() -> new AppException(ErrorCode.STATUS_NOT_EXISTED));

                    boolean exists = attendanceRepository.existsByClassRoomIdAndSemesterIdAndStudentIdAndDateAndSession(
                            classRoomId,
                            semesterId,
                            request.getStudentId(),
                            today,
                            session);
                    if (exists) {
                        throw new AppException(ErrorCode.ATTENDANCE_ALREADY_EXISTS);
                    }
                    return Attendance.builder()
                            .date(today)
                            .classRoomId(classRoomId)
                            .semesterId(semesterId)
                            .session(session)
                            .studentId(request.getStudentId())
                            .attendanceStatus(attendanceStatus)
                            .build();
                }

        ).toList();

        return attendanceRepository.saveAll(attendanceList).stream()
                .map(attendanceMapper::toAttendanceResponse).toList();
    }


}
