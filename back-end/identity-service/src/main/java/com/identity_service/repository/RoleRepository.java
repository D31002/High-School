package com.identity_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.identity_service.models.Role;

public interface RoleRepository extends JpaRepository<Role ,Integer> {
	Role findByName(String name);
}
