package com.student_service.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StudentEditRequest {
    String studentCode;
    String status;
    String fullName;
    LocalDate birthday;
    String phoneNumber;
    int gender;
    String email;
    String ethnicity;
    String nationality;
    int houseNumber;
    String street;
    String ward;
    String district;
    String city;
    String username;
    String password;
}
