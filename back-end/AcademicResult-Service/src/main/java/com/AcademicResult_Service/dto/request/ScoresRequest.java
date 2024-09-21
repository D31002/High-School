package com.AcademicResult_Service.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ScoresRequest {
    Integer scoreId;
    String score;
    int subjectId;
    int categoryId;
}
