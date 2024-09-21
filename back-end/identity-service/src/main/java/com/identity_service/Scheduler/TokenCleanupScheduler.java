package com.identity_service.Scheduler;

import com.identity_service.repository.InvalidatedTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Component
public class TokenCleanupScheduler {
    @Autowired
    private InvalidatedTokenRepository invalidatedTokenRepository;

    @Scheduled(cron = "0 0 0 * * ?")
    @Transactional
    public void scheduleTokenCleanup() {
        Date now = new Date();
        invalidatedTokenRepository.deleteByExpiryTimeBefore(now);
    }
}
