package com.schedule_service.Configuration;

import com.schedule_service.models.Lesson;
import com.schedule_service.repository.LessonRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ApplicationInitConfig {

    @Bean
    @ConditionalOnProperty(
            prefix = "spring",
            value = "datasource.driverClassName",
            havingValue = "com.mysql.cj.jdbc.Driver")
    ApplicationRunner applicationRunner(LessonRepository lessonRepository) {
        return args -> {
            if(!lessonRepository.existsById(1)){
                List<Lesson> lessons = new ArrayList<>();
                LocalTime startTimeMorning = LocalTime.of(7, 0);

                for (int i = 1; i <= 5; i++) {
                    LocalTime endTime = startTimeMorning.plusMinutes(45);
                    lessons.add(Lesson.builder()
                            .lesson(i)
                            .start(startTimeMorning)
                            .end(endTime)
                            .build());
                    if (i == 2) {
                        startTimeMorning = endTime.plusMinutes(15);
                    } else {
                        startTimeMorning = endTime.plusMinutes(5);
                    }
                }

                LocalTime startTimeChieu = LocalTime.of(13, 30);
                for (int i = 6; i <= 9; i++) {
                    LocalTime endTime = startTimeChieu.plusMinutes(45);
                    lessons.add(Lesson.builder()
                            .lesson(i)
                            .start(startTimeChieu)
                            .end(endTime)
                            .build());
                    if (i == 7) {
                        startTimeChieu = endTime.plusMinutes(15);
                    } else {
                        startTimeChieu = endTime.plusMinutes(5);
                    }
                }

                lessonRepository.saveAll(lessons);
            }
        };
    }
}