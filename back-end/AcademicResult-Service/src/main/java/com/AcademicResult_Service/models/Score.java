package com.AcademicResult_Service.models;

import java.util.Date;

import lombok.*;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Score {

	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY)
	int id;

	String score;
	Date createdTime;
	Date updatedTime;

	int subjectId;

	@ManyToOne
	Category category;

	@ManyToOne
	AcademicResult academicResult;


}
