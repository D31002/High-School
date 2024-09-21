package com.schoolYear_Semester_service.Models;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Semester {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int id;

	String code;
	String name;

	int startDay;
	int startMonth;

	int endDay;
	int endMonth;
}
