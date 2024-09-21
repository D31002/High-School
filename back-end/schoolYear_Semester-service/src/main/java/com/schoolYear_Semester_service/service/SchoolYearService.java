package com.schoolYear_Semester_service.service;

import com.schoolYear_Semester_service.Exception.AppException;
import com.schoolYear_Semester_service.Exception.ErrorCode;
import com.schoolYear_Semester_service.Mapper.SchoolYearMapper;
import com.schoolYear_Semester_service.Models.SchoolYear;
import com.schoolYear_Semester_service.dto.response.SchoolYearResponse;
import com.schoolYear_Semester_service.repository.SchoolYearRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class SchoolYearService {
    SchoolYearRepository schoolYearRepository;
    SchoolYearMapper schoolYearMapper;


    public SchoolYearResponse getBySchoolYearId(int schoolYearId) {
        return schoolYearMapper.toSchoolYearResponse(schoolYearRepository.findById(schoolYearId)
                .orElseThrow(() -> new AppException(ErrorCode.YEAR_NOT_EXISTED)));
    }

    public SchoolYearResponse getSchoolYearBySchoolYear(int schoolYear) {
        SchoolYear s = schoolYearRepository.findBySchoolYear(schoolYear);
        if(s == null)
            throw new AppException(ErrorCode.YEAR_NOT_EXISTED);
        return schoolYearMapper.toSchoolYearResponse(s);

    }

    public List<SchoolYearResponse> getAll(String keyword) {
        List<SchoolYear> schoolYearList;
        if (keyword != null && !keyword.trim().isEmpty()) {
            schoolYearList = schoolYearRepository.findByKeyword(keyword);
        } else {
            schoolYearList = schoolYearRepository.findAll();
        }
        return schoolYearList.stream()
                .sorted(Comparator.comparing(SchoolYear::getSchoolYear).reversed())
                .map(schoolYearMapper::toSchoolYearResponse)
                .toList();
    }
}
