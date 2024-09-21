package com.Relationship_Management_Service.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TeacherSubjectResponse {
    int teacherId;
}
