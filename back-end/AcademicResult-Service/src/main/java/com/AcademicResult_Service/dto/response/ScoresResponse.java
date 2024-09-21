package com.AcademicResult_Service.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ScoresResponse {
    int categoryId;
    String categoryName;
    int factor;
    List<ScoreItemResponse> scores;
}
