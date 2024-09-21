package com.AcademicResult_Service.repository;

import com.AcademicResult_Service.models.Conduct;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConductRepository extends JpaRepository<Conduct,Integer> {
}
