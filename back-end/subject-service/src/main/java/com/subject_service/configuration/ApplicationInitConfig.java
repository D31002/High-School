package com.subject_service.configuration;

import com.subject_service.models.Combination;
import com.subject_service.models.Subject;
import com.subject_service.repository.CombinationRepository;
import com.subject_service.repository.SubjectRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.stream.Collectors;
import java.util.stream.Stream;

@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ApplicationInitConfig {

    @Bean
    @ConditionalOnProperty(
            prefix = "spring.datasource",
            name = "driverClassName",
            havingValue = "com.mysql.cj.jdbc.Driver")
    ApplicationRunner applicationRunner(SubjectRepository subjectRepository, CombinationRepository combinationRepository) {
        return args -> {
            if (!subjectRepository.existsById(1)) {

                Subject toan = subjectRepository.save(Subject.builder().name("Toán").numberOfLessons(4).build());
                Subject vatLy = subjectRepository.save(Subject.builder().name("Vật lý").numberOfLessons(4).build());
                Subject hoaHoc = subjectRepository.save(Subject.builder().name("Hóa học").numberOfLessons(4).build());
                Subject sinhHoc = subjectRepository.save(Subject.builder().name("Sinh học").numberOfLessons(4).build());
                Subject nguVan = subjectRepository.save(Subject.builder().name("Ngữ văn").numberOfLessons(4).build());
                Subject lichSu = subjectRepository.save(Subject.builder().name("Lịch sử").numberOfLessons(4).build());
                Subject diaLy = subjectRepository.save(Subject.builder().name("Địa lí").numberOfLessons(4).build());
                Subject tiengAnh = subjectRepository.save(Subject.builder().name("Tiếng Anh").numberOfLessons(4).build());
                Subject gdcd = subjectRepository.save(Subject.builder().name("GDCD").numberOfLessons(2).build());
                Subject theDuc = subjectRepository.save(Subject.builder().name("TD").numberOfLessons(2).build());
                Subject qpan = subjectRepository.save(Subject.builder().name("GDQP&AN").numberOfLessons(1).build());


                combinationRepository.save(Combination.builder()
                        .name("A00")
                        .subjects(Stream.of(toan, vatLy, hoaHoc, nguVan, tiengAnh, qpan, gdcd).collect(Collectors.toSet()))
                        .build());
                combinationRepository.save(Combination.builder()
                        .name("A01")
                        .subjects(Stream.of(toan, vatLy, tiengAnh, nguVan, lichSu, qpan, gdcd).collect(Collectors.toSet()))
                        .build());
                combinationRepository.save(Combination.builder()
                        .name("B00")
                        .subjects(Stream.of(toan, hoaHoc, sinhHoc, nguVan, diaLy, qpan, gdcd).collect(Collectors.toSet()))
                        .build());
                combinationRepository.save(Combination.builder()
                        .name("C00")
                        .subjects(Stream.of(nguVan, lichSu, diaLy, toan, tiengAnh, qpan, gdcd).collect(Collectors.toSet()))
                        .build());
                combinationRepository.save(Combination.builder()
                        .name("D01")
                        .subjects(Stream.of(toan, nguVan, tiengAnh, vatLy, gdcd, qpan).collect(Collectors.toSet()))
                        .build());
            }
        };
    }
}