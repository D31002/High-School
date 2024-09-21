package com.AcademicResult_Service.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AcademicCreationRequest {
    int studentId;
    int semesterId;
    int classRoomId;

    List<ScoresRequest> scoresRequests;
}
