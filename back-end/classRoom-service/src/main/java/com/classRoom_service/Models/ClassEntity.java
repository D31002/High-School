package com.classRoom_service.Models;


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
public class ClassEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int id;

	String name;

	@ManyToOne
	Grade grade;

	int classTeacherId;

	int schoolYearId;

	int combinationId;

}
