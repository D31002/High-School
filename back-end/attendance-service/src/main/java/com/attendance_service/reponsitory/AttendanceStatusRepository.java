package com.attendance_service.reponsitory;

import com.attendance_service.models.AttendanceStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttendanceStatusRepository extends JpaRepository<AttendanceStatus,Integer> {
}
