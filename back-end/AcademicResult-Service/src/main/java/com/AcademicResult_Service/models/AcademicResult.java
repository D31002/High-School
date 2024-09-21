package com.AcademicResult_Service.models;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class AcademicResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    float meanScore;
    int studentRank;
    @ManyToOne
    AcademicPerformance academicPerformance;
    @ManyToOne
    Conduct conduct;

    int studentId;

    int semesterId;

    int classRoomId;
}
