package com.AcademicResult_Service.Configuration;

import com.AcademicResult_Service.models.AcademicPerformance;
import com.AcademicResult_Service.models.AcademicResult;
import com.AcademicResult_Service.models.Category;
import com.AcademicResult_Service.models.Conduct;
import com.AcademicResult_Service.repository.AcademicPerformanceRepository;
import com.AcademicResult_Service.repository.AcademicResultRepository;
import com.AcademicResult_Service.repository.CategoryRepository;
import com.AcademicResult_Service.repository.ConductRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.*;

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
                                        CategoryRepository categoryRepository,
                                        AcademicResultRepository academicResultRepository) {
        return args -> {

            if(!conductRepository.existsById(1)){
                Conduct conduct= conductRepository.save(Conduct.builder().name("Tốt").build());
                conductRepository.save(Conduct.builder().name("Khá").build());
                conductRepository.save(Conduct.builder().name("Trung bình").build());
                conductRepository.save(Conduct.builder().name("Yếu").build());

                AcademicPerformance academicPerformance1 = academicPerformanceRepository.save(AcademicPerformance.builder().name("Giỏi").build());
                AcademicPerformance academicPerformance2 =academicPerformanceRepository.save(AcademicPerformance.builder().name("Khá").build());
                AcademicPerformance academicPerformance3 =academicPerformanceRepository.save(AcademicPerformance.builder().name("Trung bình").build());
                AcademicPerformance academicPerformance4 =academicPerformanceRepository.save(AcademicPerformance.builder().name("Yếu").build());
                academicPerformanceRepository.save(AcademicPerformance.builder().name("Kém").build());

                categoryRepository.save(Category.builder().name("Điểm miệng").factor(1).build());
                categoryRepository.save(Category.builder().name("Điểm 15 phút").factor(1).build());
                categoryRepository.save(Category.builder().name("Điểm 1 tiết").factor(2).build());
                categoryRepository.save(Category.builder().name("Điểm học kỳ").factor(3).build());

                Random random = new Random();
                List<AcademicResult> results = new ArrayList<>();

                for(int i = 1; i <= 10; i++){
                    float meanScore = 8 + (2 * random.nextFloat());
                    meanScore = Math.round(meanScore * 10) / 10.0f;
                    results.add(AcademicResult.builder()
                            .classRoomId(1)
                            .semesterId(1)
                            .studentId(i)
                            .conduct(conduct)
                            .academicPerformance(academicPerformance1)
                            .meanScore(meanScore)
                            .studentRank(0)
                            .build());
                }

                for(int i = 11; i <= 20; i++){
                    float meanScore = 6.5f + random.nextFloat() * (7.9f - 6.5f);
                    meanScore = Math.round(meanScore * 10) / 10.0f;
                    results.add(AcademicResult.builder()
                            .classRoomId(1)
                            .semesterId(1)
                            .studentId(i)
                            .conduct(conduct)
                            .academicPerformance(academicPerformance2)
                            .meanScore(meanScore)
                            .studentRank(0) // Chưa gán rank
                            .build());
                }

                for(int i = 21; i <= 30; i++){
                    float meanScore = 5 + random.nextFloat() * (6.4f - 5f);
                    meanScore = Math.round(meanScore * 10) / 10.0f;
                    results.add(AcademicResult.builder()
                            .classRoomId(1)
                            .semesterId(1)
                            .studentId(i)
                            .conduct(conduct)
                            .academicPerformance(academicPerformance3)
                            .meanScore(meanScore)
                            .studentRank(0) // Chưa gán rank
                            .build());
                }

                for(int i = 31; i <= 40; i++){
                    float meanScore = 3.5f + random.nextFloat() * (4.9f - 3.5f);
                    meanScore = Math.round(meanScore * 10) / 10.0f;
                    results.add(AcademicResult.builder()
                            .classRoomId(1)
                            .semesterId(1)
                            .studentId(i)
                            .conduct(conduct)
                            .academicPerformance(academicPerformance4)
                            .meanScore(meanScore)
                            .studentRank(0) // Chưa gán rank
                            .build());
                }

                // Sắp xếp kết quả theo meanScore
                results.sort(Comparator.comparingDouble(AcademicResult::getMeanScore).reversed());

                // Gán rank cho từng kết quả
                for (int rank = 0; rank < results.size(); rank++) {
                    results.get(rank).setStudentRank(rank + 1);
                }

                for (AcademicResult result : results) {
                    academicResultRepository.save(result);
                }
            }

        };
    }
}