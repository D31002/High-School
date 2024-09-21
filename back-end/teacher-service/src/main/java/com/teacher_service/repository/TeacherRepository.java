package com.teacher_service.repository;

import com.teacher_service.Models.Teacher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Set;

public interface TeacherRepository extends JpaRepository<Teacher,Integer> {
    Teacher findByProfileId(int profileId);

    Teacher findByTeacherCode(String teacherCode);

    @Query("SELECT t.teacherCode FROM Teacher t WHERE t.teacherCode IN ?1")
    List<String> findTeacherCodesByCodes(List<String> teacherCodes);

    @Query("SELECT t FROM Teacher t WHERE t IN :teacherList")
    Page<Teacher> findByTeacherList(List<Teacher> teacherList, Pageable pageable);
}
