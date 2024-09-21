package com.teacher_service.dto.request;

import com.teacher_service.Models.UserType;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserProfileCreationRequest {
    String fullName;
    LocalDate birthday;
    String phoneNumber;
    int gender;
    String email;
    String ethnicity;
    String nationality;
    int houseNumber;
    String street;
    String hamlet;
    String ward;
    String district;
    String city;
    String username;
    String password;
    UserType userType;
}
