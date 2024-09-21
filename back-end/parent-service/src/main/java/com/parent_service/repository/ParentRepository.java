package com.parent_service.repository;

import com.parent_service.models.Parent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParentRepository extends JpaRepository<Parent,Integer> {
}
