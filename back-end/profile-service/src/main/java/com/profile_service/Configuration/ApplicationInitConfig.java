package com.profile_service.Configuration;

import com.profile_service.models.AddressProfile;
import com.profile_service.models.UserProfile;
import com.profile_service.models.UserType;
import com.profile_service.repository.AddressProfileRepository;
import com.profile_service.repository.UserProfileRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;

@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ApplicationInitConfig {

    @Bean
    @ConditionalOnProperty(
            prefix = "spring",
            value = "datasource.driverClassName",
            havingValue = "com.mysql.cj.jdbc.Driver")
    ApplicationRunner applicationRunner(UserProfileRepository userProfileRepository,
    AddressProfileRepository addressProfileRepository) {
        return args -> {
            if(!userProfileRepository.existsById(1)){
                userProfileRepository.save(UserProfile.builder()
                                .email("admin@gmail.com")
                                .address(addressProfileRepository
                                        .save(AddressProfile.builder()
                                                .city("Thành Phố Cần Thơ")
                                                .district("Quận Ninh Kiều")
                                                .ward("Phường Xuân Khánh")
                                                .street("3/2")
                                                .houseNumber(4)
                                                .build()))
                                .birthday(LocalDate.of(2002,10,3))
                                .fullName("ADMIN")
                                .gender(1)
                                .ethnicity("Kinh")
                                .nationality("Việt Nam")
                                .imageUrl("https://res.cloudinary.com/danrswhe6/image/upload/v1721713336/1dbe84ad-b114-475b-b65d-baa126f4f6dd.jpg")
                                .phoneNumber("0943946242")
                                .userType(UserType.teacher)
                                .userId(1)
                        .build());
            }
        };
    }
}