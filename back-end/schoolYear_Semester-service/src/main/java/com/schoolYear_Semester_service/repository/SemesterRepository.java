package com.schoolYear_Semester_service.repository;

import com.schoolYear_Semester_service.Models.Semester;
import org.springframework.data.jpa.repository.JpaRepository;


public interface SemesterRepository extends JpaRepository<Semester,Integer> {

}
