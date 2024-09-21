package com.schoolYear_Semester_service.repository;

import com.schoolYear_Semester_service.Models.SchoolYear;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface SchoolYearRepository extends JpaRepository<SchoolYear,Integer> {
    @Query("SELECT s FROM SchoolYear s WHERE CAST(s.schoolYear AS string) LIKE %?1%")
    List<SchoolYear> findByKeyword(String keyword);

    SchoolYear findBySchoolYear(int schoolYear);
}
