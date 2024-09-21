package com.AcademicResult_Service.repository;

import com.AcademicResult_Service.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category,Integer> {
}
