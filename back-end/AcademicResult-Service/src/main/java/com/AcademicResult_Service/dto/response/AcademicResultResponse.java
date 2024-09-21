package com.AcademicResult_Service.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AcademicResultResponse {
    int id;
    int studentId;
    String studentCode;
    String fullName;
    float meanScore;
    int studentRank;
    AcademicPerformanceResponse academicPerformance;
    ConductResponse conduct;
    List<ScoresResponse> scoresResponses;

}
