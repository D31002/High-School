package com.subject_service.service;

import com.subject_service.Exception.AppException;
import com.subject_service.Exception.ErrorCode;
import com.subject_service.Mapper.CombinationMapper;
import com.subject_service.Mapper.SubjectMapper;
import com.subject_service.dto.response.CombinationResponse;
import com.subject_service.dto.response.SubjectResponse;
import com.subject_service.models.Combination;
import com.subject_service.models.Subject;
import com.subject_service.repository.CombinationRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class CombinationService {

    CombinationRepository combinationRepository;
    CombinationMapper combinationMapper;
    SubjectMapper subjectMapper;

    public List<CombinationResponse> getAllCombination() {
        return combinationRepository.findAll().stream()
                .map(combinationMapper::toCombinationResponse)
                .collect(Collectors.toList());
    }

    public CombinationResponse getCombinationById(int combinationId) {
        Combination combination = combinationRepository.findById(combinationId)
                .orElseThrow(() -> new AppException(ErrorCode.COMBINATION_NOT_EXISTED));

        CombinationResponse combinationResponse = combinationMapper.toCombinationResponse(combination);

        Set<SubjectResponse> subjectResponses = combination.getSubjects().stream()
                .sorted(Comparator.comparingInt(Subject::getId))
                .map(subjectMapper::toSubjectResponse)
                .collect(Collectors.toCollection(LinkedHashSet::new));

        combinationResponse.setSubjects(subjectResponses);

        return combinationResponse;
    }
}
