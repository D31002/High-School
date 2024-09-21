package com.student_service.dto.request;

import com.student_service.models.UserType;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ParentCreationRequest {
    String fatherName;
    LocalDate fatherBirthday;
    String fatherPhoneNumber;
    String fatherJob;
    String motherName;
    LocalDate motherBirthday;
    String motherPhoneNumber;
    String motherJob;
}
