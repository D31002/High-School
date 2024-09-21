package com.schoolYear_Semester_service.Configuration;

import com.schoolYear_Semester_service.Models.SchoolYear;
import com.schoolYear_Semester_service.Models.Semester;
import com.schoolYear_Semester_service.repository.SchoolYearRepository;
import com.schoolYear_Semester_service.repository.SemesterRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ApplicationInitConfig {

    @Bean
    @ConditionalOnProperty(
            prefix = "spring",
            value = "datasource.driverClassName",
            havingValue = "com.mysql.cj.jdbc.Driver")
    ApplicationRunner applicationRunner(SchoolYearRepository schoolYearRepository, SemesterRepository semesterRepository) {
        return args -> {
            if (!schoolYearRepository.existsById(1)) {
                schoolYearRepository.save(SchoolYear.builder()
                        .schoolYear(2023).build());
                schoolYearRepository.save(SchoolYear.builder().schoolYear(2024).build());
                semesterRepository.save(Semester.builder()
                        .code("I")
                        .name("Học kỳ 1")
                        .startDay(5).startMonth(9).endDay(15).endMonth(1).build());
                semesterRepository.save(Semester.builder()
                        .code("I")
                        .name("Học kỳ 2")
                        .startDay(22).startMonth(1).endDay(25).endMonth(5).build());

            }
        };
    }
}