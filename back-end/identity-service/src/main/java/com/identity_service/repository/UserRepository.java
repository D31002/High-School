package com.identity_service.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.identity_service.models.Role;
import com.identity_service.models.User;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>{
	User findByUsername(String username);
	
	List<User> findByRolesContaining(Role role);
}
