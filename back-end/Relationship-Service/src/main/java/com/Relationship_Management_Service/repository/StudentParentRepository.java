package com.Relationship_Management_Service.repository;

import com.Relationship_Management_Service.models.StudentParent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Arrays;
import java.util.List;

public interface StudentParentRepository extends JpaRepository<StudentParent,Integer> {
    List<StudentParent> findByStudentId(int studentId);
}
