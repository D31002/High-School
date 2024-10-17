package com.AcademicResult_Service.repository;

import com.AcademicResult_Service.models.AcademicResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AcademicResultRepository extends JpaRepository<AcademicResult,Integer> {
    AcademicResult findByStudentIdAndSemesterIdAndClassRoomId(int studentId, int semesterId, int classRoomId);

    @Query(value = "SELECT a FROM AcademicResult a WHERE " +
            "(?1 IS NULL OR a.classRoomId = ?1) AND" +
            "(?2 IS NULL OR a.semesterId = ?2)")
    List<AcademicResult> findByClassRoomIdAndSemesterId(Integer classRoomId, Integer semesterId);

    @Query(value = "SELECT a FROM AcademicResult a WHERE a.classRoomId = ?1 AND a.academicPerformance.id <= 3")
    List<AcademicResult> findByClassRoomAndAboveAverage(int classRoomId);
}
