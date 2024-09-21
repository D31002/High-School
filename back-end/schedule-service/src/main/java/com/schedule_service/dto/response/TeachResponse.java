package com.schedule_service.dto.response;

import com.schedule_service.models.Lesson;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.DayOfWeek;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TeachResponse {

	int id;

	DayOfWeek dayOfWeek;

	LessonResponse lesson;

	ClassEntityResponse classEntityResponse;

	TeacherResponse teacherResponse;

	SubjectResponse subjectResponse;

	SchoolYearResponse schoolYearResponse;



}
