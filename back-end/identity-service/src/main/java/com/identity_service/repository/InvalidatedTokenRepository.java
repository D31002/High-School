package com.identity_service.repository;

import com.identity_service.models.InvalidatedToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;


@Repository
public interface InvalidatedTokenRepository extends JpaRepository<InvalidatedToken, String> {
    List<InvalidatedToken> findByExpiryTimeBefore(Date expiryTime);
    void deleteByExpiryTimeBefore(Date expiryTime);
}
