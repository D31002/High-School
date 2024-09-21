package com.subject_service.repository;

import com.subject_service.models.Combination;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CombinationRepository extends JpaRepository<Combination, Integer> {
    Combination findByName(String name);
}
