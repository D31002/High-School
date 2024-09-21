package com.attendance_service.reponsitory;

import com.attendance_service.models.Attendance;
import com.attendance_service.models.Session;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface AttendanceRepository extends JpaRepository<Attendance,Integer> {

    boolean existsByClassRoomIdAndSemesterIdAndStudentIdAndDateAndSession(
            int classRoomId, int semesterId, int studentId, LocalDate date, Session session);

    List<Attendance> findByStudentIdAndClassRoomIdAndSemesterId(int studentId, int classRoomId, int semesterId);
}
