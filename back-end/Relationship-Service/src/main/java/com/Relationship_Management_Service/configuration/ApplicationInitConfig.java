package com.Relationship_Management_Service.configuration;

import com.Relationship_Management_Service.models.TeacherSubject;
import com.Relationship_Management_Service.repository.TeacherSubjectRepository;
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
    ApplicationRunner applicationRunner(TeacherSubjectRepository teacherSubjectRepository) {
        return args -> {
            if(!teacherSubjectRepository.existsById(1)){
            }
        };
    }
}