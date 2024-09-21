package com.teacher_service.Configuration;

import com.teacher_service.Models.Teacher;
import com.teacher_service.repository.TeacherRepository;
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
    ApplicationRunner applicationRunner(TeacherRepository teacherRepository) {
        return args -> {
            if(!teacherRepository.existsById(1)){
                teacherRepository.save(Teacher.builder()
                        .teacherCode("AD000001")
                        .profileId(1)
                        .build());
            }
        };
    }
}