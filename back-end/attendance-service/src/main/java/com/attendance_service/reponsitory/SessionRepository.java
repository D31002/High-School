package com.attendance_service.reponsitory;


import com.attendance_service.models.Session;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SessionRepository extends JpaRepository<Session,Integer> {
}
