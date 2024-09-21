package com.schoolYear_Semester_service.Scheduler;

import com.schoolYear_Semester_service.Models.SchoolYear;
import com.schoolYear_Semester_service.repository.SchoolYearRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class SchoolYearScheduler {

    @Autowired
    private SchoolYearRepository schoolYearRepository;

    @Scheduled(cron = "0 0 0 29 8 ?")
    public void addNewSchoolYear(){
        int year = LocalDate.now().getYear();
        schoolYearRepository.save(SchoolYear.builder().schoolYear(year).build());
    }
}
