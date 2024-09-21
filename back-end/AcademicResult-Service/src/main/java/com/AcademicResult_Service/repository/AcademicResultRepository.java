package com.AcademicResult_Service.repository;

import com.AcademicResult_Service.models.AcademicResult;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AcademicResultRepository extends JpaRepository<AcademicResult,Integer> {
    AcademicResult findByStudentIdAndSemesterIdAndClassRoomId(int studentId, int semesterId, int classRoomId);
}
