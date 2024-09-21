package com.attendance_service.Configuration;

import com.attendance_service.models.AttendanceStatus;
import com.attendance_service.models.Session;
import com.attendance_service.reponsitory.AttendanceRepository;
import com.attendance_service.reponsitory.AttendanceStatusRepository;
import com.attendance_service.reponsitory.SessionRepository;
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
    ApplicationRunner applicationRunner(AttendanceRepository attendanceRepository,
                                        AttendanceStatusRepository attendanceStatusRepository,
                                        SessionRepository sessionRepository) {
        return args -> {
            if (!attendanceStatusRepository.existsById(1)) {
                attendanceStatusRepository.save(AttendanceStatus.builder()
                                .statusName("Vắng có phép")
                        .build());
                attendanceStatusRepository.save(AttendanceStatus.builder()
                        .statusName("Vắng không phép")
                        .build());
                attendanceStatusRepository.save(AttendanceStatus.builder()
                        .statusName("Đi muộn")
                        .build());
            }
            if (!sessionRepository.existsById(1)) {
                sessionRepository.save(Session.builder().sessionType("Buổi sáng").build());
                sessionRepository.save(Session.builder().sessionType("Buổi chiều").build());
            }
        };
    }
}