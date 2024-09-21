package com.subject_service.repository;

import com.subject_service.models.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface SubjectRepository extends JpaRepository<Subject,Integer> {

    @Query(value = "SELECT s FROM Subject s WHERE LOWER(s.name) LIKE LOWER(CONCAT(?1, '%'))")
    List<Subject> findAllByKeyWord(String keyword);
}
