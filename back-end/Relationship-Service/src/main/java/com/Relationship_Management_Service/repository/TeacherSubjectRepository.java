package com.Relationship_Management_Service.repository;

import com.Relationship_Management_Service.dto.response.ArrSubjectResponse;
import com.Relationship_Management_Service.models.TeacherSubject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Arrays;
import java.util.List;

public interface TeacherSubjectRepository extends JpaRepository<TeacherSubject,Integer> {
    @Query(value = "SELECT t From TeacherSubject t WHERE t.subjectId = ?1")
    List<TeacherSubject> findBySubjectId(int subjectId);

    @Query(value = "SELECT t From TeacherSubject t WHERE t.teacherId = ?1")
    List<TeacherSubject> findByTeacherId(int teacherId);

    TeacherSubject findByTeacherIdAndSubjectId(int teacherId, int subjectId);


}
