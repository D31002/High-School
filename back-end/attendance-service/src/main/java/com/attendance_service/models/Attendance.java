package com.attendance_service.models;

import java.time.LocalDate;
import java.util.Date;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Attendance {

	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY)
	int id;

	LocalDate date;

	int studentId;

	int semesterId;

    int classRoomId;

	@ManyToOne
	AttendanceStatus attendanceStatus;

	@ManyToOne
	Session session;
}
