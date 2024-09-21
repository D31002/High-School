package com.profile_service.repository;

import com.profile_service.models.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserProfileRepository extends JpaRepository<UserProfile,Integer> {
    UserProfile findByUserId(int userId);

    @Query("SELECT u FROM UserProfile u WHERE LOWER(u.fullName) LIKE LOWER(CONCAT(?1, '%'))")
    List<UserProfile> findByFullNameContainingIgnoreCase(String keyword);
}
