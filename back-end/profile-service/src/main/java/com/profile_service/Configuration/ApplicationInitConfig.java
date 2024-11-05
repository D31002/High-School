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

                String[] fullNames = {
                        "Nguyễn Văn An", "Trần Thị Bình", "Lê Hoàng Cường", "Phạm Thị Duyên", "Đỗ Minh Đức",
                        "Hoàng Thị Hương", "Ngô Văn Khánh", "Vũ Thị Lan", "Bùi Minh Nhật", "Lý Thị Ngọc",
                        "Trương Văn Quốc", "Đinh Thị Quyên", "Nguyễn Thị Hoa", "Trần Văn Minh", "Lê Văn Tài",
                        "Phạm Thị Bích", "Đỗ Văn Toàn", "Hoàng Văn Phúc", "Ngô Thị Mai", "Vũ Văn Thành",
                        "Bùi Thị Kim", "Lý Văn Hưng", "Trương Thị Thanh", "Đinh Văn Phúc", "Nguyễn Văn Hòa",
                        "Trần Văn Vinh", "Lê Thị Xuân", "Phạm Văn Sơn", "Đỗ Thị Hiền", "Hoàng Văn Lâm",
                        "Ngô Văn Tiến", "Vũ Thị Bích", "Bùi Văn Quang", "Lý Văn Tùng", "Trương Thị Thu",
                        "Đinh Văn Hải", "Nguyễn Thị Phương", "Trần Văn Khoa", "Lê Văn Dũng", "Phạm Thị Liên",
                        "Đỗ Văn Hưng", "Hoàng Thị Tuyết", "Ngô Văn Minh", "Vũ Văn Cường","Phan Thị Hương",
                        "Lâm Văn Hải", "Nguyễn Thị Phương", "Trần Văn Nam", "Lê Thị Hoa","Đỗ Văn Tâm"

                };

                String[] wards = {
                        "Phường Xuân Khánh", "Phường An Bình", "Phường Tân An", "Phường Cái Khế", "Phường Hưng Lợi"
                };
                String[] streets = {
                        "Đường 3/2", "Đường Nguyễn Văn Cừ", "Đường Lê Hồng Phong", "Đường Trần Văn Khéo", "Đường Trần Quốc Toản"
                };
                String[] districts = {
                        "Quận Ninh Kiều", "Quận Ô Môn", "Quận Bình Thủy", "Quận Cái Răng", "Quận Thốt Nốt"
                };

                for (int i = 0; i < fullNames.length; i++) {
                    userProfileRepository.save(UserProfile.builder()
                            .email("teacher" + (i + 2) + "@gmail.com")
                            .address(addressProfileRepository
                                    .save(AddressProfile.builder()
                                            .city("Thành Phố Cần Thơ")
                                            .district(districts[i % districts.length])
                                            .ward(wards[i % wards.length])
                                            .street(streets[i % streets.length])
                                            .houseNumber(1 + (i % 50))
                                            .build()))
                            .birthday(LocalDate.of(1980 + (i % 20), 1 + (i % 12), 1 + (i % 28)))
                            .fullName(fullNames[i])
                            .gender(i % 2 == 0 ? 1 : 0)
                            .ethnicity("Kinh")
                            .nationality("Việt Nam")
                            .phoneNumber("0943946242")
                            .userType(UserType.teacher)
                            .userId(i + 2)
                            .build());
                }



                //student
                String[] studentNames = {
                        "Nguyễn Hoàng Anh", "Trần Minh Châu", "Lê Thanh Tâm", "Phạm Quốc Bảo", "Đỗ Huyền Trang",
                        "Vũ Đăng Khoa", "Nguyễn Thị Mai", "Lê Văn Sơn", "Trần Ngọc Lan", "Đinh Thế Anh",
                        "Nguyễn Thị Hương", "Phạm Minh Tuấn", "Lê Thị Bích", "Trần Xuân Hòa", "Nguyễn Tiến Dũng",
                        "Bùi Thị Nhung", "Nguyễn Văn Hải", "Lê Đình Phong", "Trần Thị Ngọc", "Nguyễn Thành Đạt",
                        "Đỗ Minh Hùng", "Lê Thị Hằng", "Vũ Văn An", "Nguyễn Văn Kiên", "Trần Văn Lộc",
                        "Nguyễn Ngọc Thạch", "Phạm Thị Kim", "Lê Văn Hưng", "Trần Minh Quân", "Nguyễn Phương Linh",
                        "Đinh Văn Duy", "Vũ Thị Ngọc", "Bùi Văn Tâm", "Nguyễn Thị Yến", "Trần Đình Nam",
                        "Nguyễn Văn Cường", "Lê Thị Liên", "Phạm Văn Lâm", "Đỗ Minh Tâm", "Nguyễn Văn Tú"
                };
                for (int i = 0;i<studentNames.length;i++){
                    userProfileRepository.save(UserProfile.builder()
                            .email("student" + (i + 42) + "@gmail.com")
                            .address(addressProfileRepository
                                    .save(AddressProfile.builder()
                                            .city("Thành Phố Cần Thơ")
                                            .district(districts[i % districts.length])
                                            .ward(wards[i % wards.length])
                                            .street(streets[i % streets.length])
                                            .houseNumber(1 + (i % 50))
                                            .build()))
                            .birthday(LocalDate.of(2007, 1 + (i % 12), 1 + (i % 28)))
                            .fullName(studentNames[i])
                            .gender(i % 2 == 0 ? 1 : 0)
                            .ethnicity("Kinh")
                            .nationality("Việt Nam")
                            .phoneNumber("0943946242")
                            .userType(UserType.student)
                            .userId(i + 52)
                            .build());
                }
            }
        };
    }
}