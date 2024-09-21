package com.schedule_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.schedule_service.models.Teach;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TeachRepository extends JpaRepository<Teach, Integer> {
    List<Teach> findBySchoolYearId(int schoolYearId);

    List<Teach> findByTeacherIdAndSchoolYearId(int teacherId, int schoolYearId);

    @Query("SELECT DISTINCT t.classRoomId From Teach t WHERE t.teacherId = ?1 AND t.schoolYearId = ?2")
    List<Integer> findClassRoomIdsByTeacherId(int teacherId, int schoolYearId);

//    @Query("SELECT FROM Teach t WHERE t.teacherId = ?1 AND t.classRoomId = ?2")
    List<Teach> findByTeacherIdAndClassRoomId(int teacherId, int classRoomId);
}
