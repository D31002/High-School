package com.AcademicResult_Service.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AssessmentRequest {
    int id;
    float meanScore;
    int studentRank;
    AcademicPerformanceRequest academicPerformance;
    ConductRequest conduct;
}
