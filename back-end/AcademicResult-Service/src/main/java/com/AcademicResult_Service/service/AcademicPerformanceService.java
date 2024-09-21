package com.AcademicResult_Service.service;

import com.AcademicResult_Service.dto.response.AcademicPerformanceResponse;
import com.AcademicResult_Service.mapper.AcademicPerformanceMapper;
import com.AcademicResult_Service.repository.AcademicPerformanceRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class AcademicPerformanceService {

    AcademicPerformanceRepository academicPerformanceRepository;
    AcademicPerformanceMapper academicPerformanceMapper;

    public List<AcademicPerformanceResponse> getAll() {
        return academicPerformanceRepository.findAll().stream()
                .map(academicPerformanceMapper::toAcademicPerformanceResponse).toList();

    }
}
