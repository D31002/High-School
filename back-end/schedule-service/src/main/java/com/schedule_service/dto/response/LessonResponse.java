package com.schedule_service.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class LessonResponse {
    int id;
    int lesson;
    LocalTime start;
    LocalTime end;
}
