package com.attendance_service.service;

import com.attendance_service.dto.response.SessionResponse;
import com.attendance_service.mapper.SessionMapper;
import com.attendance_service.reponsitory.SessionRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class SessionService {

    SessionRepository sessionRepository;
    SessionMapper sessionMapper;

    public List<SessionResponse> getAllSession() {
        return sessionRepository.findAll().stream()
                .map(sessionMapper::toSessionResponse).toList();
    }
}
