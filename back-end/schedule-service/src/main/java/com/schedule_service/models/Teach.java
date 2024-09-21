package com.schedule_service.models;

import java.time.DayOfWeek;
import java.util.Set;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Teach {
	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY)
	int id;

	DayOfWeek dayOfWeek;

	int teacherId;

	int subjectId;

	int classRoomId;

	int schoolYearId;

	@ManyToOne
	@JoinColumn(name = "lesson_id")
	Lesson lesson;

}
