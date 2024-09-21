package com.AcademicResult_Service.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ScoreItemResponse {
    int scoreId;
    int subjectId;
    String score;
}
