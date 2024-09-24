package com.schedule_service.dto.request;

import com.schedule_service.models.Lesson;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.DayOfWeek;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class LessonPair {
    Lesson lesson;
    DayOfWeek dayOfWeek;
    int teacherId;
}