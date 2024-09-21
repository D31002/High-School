package com.student_service.repository;

import com.student_service.models.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StudentRepository extends JpaRepository<Student,Integer> {
    Student findByStudentCode(String studentCode);

    Student findByProfileId(int profileId);

    @Query("SELECT t.studentCode FROM Student t WHERE t.studentCode IN ?1")
    List<String> findStudentCodesByCodes(List<String> studentCodes);

    @Query("SELECT s FROM Student s WHERE s IN :students")
    Page<Student> findByStudents(List<Student> students, Pageable pageable);
}
