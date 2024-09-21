package com.classRoom_service.repository;

import com.classRoom_service.Models.Grade;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GradeRepository extends JpaRepository<Grade,Integer> {
}
