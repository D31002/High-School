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
                roleRepository.save(Role.builder().name("TEACHER").build());
                Role proctorRole = roleRepository.save(Role.builder().name("PROCTOR").build());
                roleRepository.save(Role.builder().name("STUDENT").build());

                Set<Role> adminRoles = new HashSet<>();
                adminRoles.add(adminRole);
                adminRoles.add(proctorRole);

                userRepository.save(User.builder()
                        .username(ADMIN_USER_CODE)
                        .password(passwordEncode.encode(ADMIN_PASSWORD))
                        .roles(adminRoles)
                        .build());

            }
        };
    }
}