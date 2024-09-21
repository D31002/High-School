package com.profile_service.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ParentCreationRequest {
    int fatherId;
    String fatherName;
    LocalDate fatherBirthday;
    String fatherPhoneNumber;
    String fatherJob;
    int motherId;
    String motherName;
    LocalDate motherBirthday;
    String motherPhoneNumber;
    String motherJob;
    int houseNumber;
    String street;
    String ward;
    String district;
    String city;
}
