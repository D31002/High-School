package com.AcademicResult_Service.service;

import com.AcademicResult_Service.dto.response.CategoryResponse;
import com.AcademicResult_Service.dto.response.ConductResponse;
import com.AcademicResult_Service.mapper.ConductMapper;
import com.AcademicResult_Service.repository.ConductRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class ConductService {

    ConductRepository conductRepository;
    ConductMapper conductMapper;

    public List<ConductResponse> getAll() {
        return conductRepository.findAll().stream().map(conductMapper::toConductResponse).toList();

    }
}
