package com.classRoom_service.Configuration;

import com.classRoom_service.Models.ClassEntity;
import com.classRoom_service.Models.Grade;
import com.classRoom_service.repository.ClassEntityRepository;
import com.classRoom_service.repository.GradeRepository;
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
    ApplicationRunner applicationRunner(GradeRepository gradeRepository,
                                        ClassEntityRepository classEntityRepository) {
        return args -> {
            if (!gradeRepository.existsById(1)) {
                Grade grade10 = gradeRepository.save(Grade.builder().grade(10).build());
                Grade grade11 = gradeRepository.save(Grade.builder().grade(11).build());
                Grade grade12 = gradeRepository.save(Grade.builder().grade(12).build());

                classEntityRepository.save(ClassEntity.builder()
                        .name("10A1").schoolYearId(1).grade(grade10).combinationId(1).build());
                classEntityRepository.save(ClassEntity.builder()
                        .name("10A2").schoolYearId(1).grade(grade10).combinationId(2).build());
                classEntityRepository.save(ClassEntity.builder()
                        .name("10B3").schoolYearId(1).grade(grade10).combinationId(3).build());
                classEntityRepository.save(ClassEntity.builder()
                        .name("10C4").schoolYearId(1).grade(grade10).combinationId(4).build());
                classEntityRepository.save(ClassEntity.builder()
                        .name("10D5").schoolYearId(1).grade(grade10).combinationId(5).build());

                classEntityRepository.save(ClassEntity.builder()
                        .name("11A1").schoolYearId(1).grade(grade11).combinationId(1).build());
                classEntityRepository.save(ClassEntity.builder()
                        .name("11A2").schoolYearId(1).grade(grade11).combinationId(2).build());
                classEntityRepository.save(ClassEntity.builder()
                        .name("11B3").schoolYearId(1).grade(grade11).combinationId(3).build());
                classEntityRepository.save(ClassEntity.builder()
                        .name("11C4").schoolYearId(1).grade(grade11).combinationId(4).build());
                classEntityRepository.save(ClassEntity.builder()
                        .name("11D5").schoolYearId(1).grade(grade11).combinationId(5).build());



                classEntityRepository.save(ClassEntity.builder()
                        .name("12A1").schoolYearId(1).grade(grade12).combinationId(1).build());
                classEntityRepository.save(ClassEntity.builder()
                        .name("12A2").schoolYearId(1).grade(grade12).combinationId(2).build());
                classEntityRepository.save(ClassEntity.builder()
                        .name("12B3").schoolYearId(1).grade(grade12).combinationId(3).build());
                classEntityRepository.save(ClassEntity.builder()
                        .name("12C4").schoolYearId(1).grade(grade12).combinationId(4).build());
                classEntityRepository.save(ClassEntity.builder()
                        .name("12D5").schoolYearId(1).grade(grade12).combinationId(5).build());


            }
        };
    }
}