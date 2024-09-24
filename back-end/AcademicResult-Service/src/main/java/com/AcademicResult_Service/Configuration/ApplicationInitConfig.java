package com.AcademicResult_Service.Configuration;

import com.AcademicResult_Service.models.AcademicPerformance;
import com.AcademicResult_Service.models.Category;
import com.AcademicResult_Service.models.Conduct;
import com.AcademicResult_Service.repository.AcademicPerformanceRepository;
import com.AcademicResult_Service.repository.CategoryRepository;
import com.AcademicResult_Service.repository.ConductRepository;
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
    ApplicationRunner applicationRunner(ConductRepository conductRepository,
                                        AcademicPerformanceRepository academicPerformanceRepository,
                                        CategoryRepository categoryRepository) {
        return args -> {
            if(!conductRepository.existsById(1)){
                conductRepository.save(Conduct.builder().name("Tốt").build());
                conductRepository.save(Conduct.builder().name("Khá").build());
                conductRepository.save(Conduct.builder().name("Trung bình").build());
                conductRepository.save(Conduct.builder().name("Yếu").build());
            }
            if(!academicPerformanceRepository.existsById(1)){
                academicPerformanceRepository.save(AcademicPerformance.builder().name("Giỏi").build());
                academicPerformanceRepository.save(AcademicPerformance.builder().name("Khá").build());
                academicPerformanceRepository.save(AcademicPerformance.builder().name("Trung bình").build());
                academicPerformanceRepository.save(AcademicPerformance.builder().name("Yếu").build());
                academicPerformanceRepository.save(AcademicPerformance.builder().name("Kém").build());
            }
            if(!categoryRepository.existsById(1)){
                categoryRepository.save(Category.builder().name("Điểm miệng").factor(1).build());
                categoryRepository.save(Category.builder().name("Điểm 15 phút").factor(1).build());
                categoryRepository.save(Category.builder().name("Điểm 1 tiết").factor(2).build());
                categoryRepository.save(Category.builder().name("Điểm học kỳ").factor(3).build());
            }
        };
    }
}