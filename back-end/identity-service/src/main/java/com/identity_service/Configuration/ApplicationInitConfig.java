package com.identity_service.Configuration;

import com.identity_service.models.*;
import com.identity_service.repository.*;
import lombok.AccessLevel;
import lombok.experimental.NonFinal;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;
import java.util.Set;

@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ApplicationInitConfig {

    PasswordEncoder passwordEncode;

    @NonFinal
    static final String ADMIN_USER_CODE = "AD000001";

    @NonFinal
    static final String ADMIN_PASSWORD = "admin";

    @Bean
    @ConditionalOnProperty(
            prefix = "spring.datasource",
            name = "driverClassName",
            havingValue = "com.mysql.cj.jdbc.Driver")
    ApplicationRunner applicationRunner(RoleRepository roleRepository, UserRepository userRepository) {
        return args -> {
            if (userRepository.findByUsername(ADMIN_USER_CODE) == null) {

                Role adminRole = roleRepository.save(Role.builder().name("ADMIN").build());
                roleRepository.save(Role.builder().name("USER").build());
                Role teacherRole = roleRepository.save(Role.builder().name("TEACHER").build());
                Role proctorRole = roleRepository.save(Role.builder().name("PROCTOR").build());
                Role studentRole = roleRepository.save(Role.builder().name("STUDENT").build());

                Set<Role> adminRoles = new HashSet<>();
                adminRoles.add(adminRole);
                adminRoles.add(proctorRole);

                Set<Role> teacherRoles = new HashSet<>();
                teacherRoles.add(teacherRole);

                Set<Role> studentRoles = new HashSet<>();
                studentRoles.add(studentRole);

                userRepository.save(User.builder()
                        .username(ADMIN_USER_CODE)
                        .password(passwordEncode.encode(ADMIN_PASSWORD))
                        .roles(adminRoles)
                        .enable(true)
                        .build());

                for (int i = 1; i <= 30; i++) {
                    String teacherCode = String.format("CB%06d", i);
                    userRepository.save(User.builder()
                            .username(teacherCode)
                            .password(passwordEncode.encode(teacherCode))
                            .roles(teacherRoles)
                            .enable(true)
                            .build());
                }

                for (int i = 1; i <= 40; i++) {
                    String studentCode = String.format("HS%06d", i+40);
                    userRepository.save(User.builder()
                            .username(studentCode)
                            .password(passwordEncode.encode(studentCode))
                            .roles(studentRoles)
                            .enable(true)
                            .build());
                }
            }
        };
    }
}