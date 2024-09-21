package com.schoolYear_Semester_service.service;

import com.schoolYear_Semester_service.Mapper.SemesterMapper;
import com.schoolYear_Semester_service.Models.Semester;
import com.schoolYear_Semester_service.dto.response.SemesterResponse;
import com.schoolYear_Semester_service.repository.SemesterRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class SemesterService {

    SemesterRepository semesterRepository;
    SchoolYearService schoolYearService;
    SemesterMapper semesterMapper;

    public List<SemesterResponse> getAll() {
        List<Semester> semesterList = semesterRepository.findAll();

        return semesterList.stream().map(semesterMapper::toSemesterResponse).toList();
    }

    public SemesterResponse getSemesterNow() {
        LocalDate today = LocalDate.now();

        List<Semester> semesterList = semesterRepository.findAll();

        int schoolYear = schoolYearService.getAll("").get(0).getSchoolYear();

        Semester semesterNow = semesterList.stream().filter(
                semester -> {
                    int startYear = semester.getStartMonth() >= 9 ? schoolYear : schoolYear + 1;
                    int endYear = schoolYear +1;

                    LocalDate startHK = LocalDate.of(startYear,semester.getStartMonth(),semester.getStartDay());
                    LocalDate endHK = LocalDate.of(endYear,semester.getEndMonth(),semester.getEndDay());

                    return today.isAfter(startHK) && today.isBefore(endHK);
                }
        ).findFirst().orElse(null);

        return semesterMapper.toSemesterResponse(semesterNow);
    }
}
