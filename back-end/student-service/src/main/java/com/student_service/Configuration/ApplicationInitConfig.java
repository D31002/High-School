package com.student_service.Configuration;

import com.student_service.models.Status;
import com.student_service.models.Student;
import com.student_service.repository.StudentRepository;
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
    ApplicationRunner applicationRunner(StudentRepository studentRepository) {
        return args -> {
            if(!studentRepository.existsById(1)){
                for (int i=1;i<=40;i++){
                    String studentCode = String.format("HS%06d",i+40);
                    studentRepository.save(Student.builder()
                            .studentCode(studentCode)
                            .status(Status.ENROLLED)
                            .profileId(i+51)
                            .build());
                }
            }
        };
    }
}