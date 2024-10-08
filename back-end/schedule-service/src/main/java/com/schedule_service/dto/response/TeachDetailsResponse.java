package com.schedule_service.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.DayOfWeek;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TeachDetailsResponse {
    int id;

    DayOfWeek dayOfWeek;

    LessonResponse lesson;

    ClassEntityResponse classEntityResponse;

    TeacherResponse teacherResponse;

    SubjectResponse subjectResponse;
}
