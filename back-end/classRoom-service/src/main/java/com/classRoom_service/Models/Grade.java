package com.classRoom_service.Models;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Grade {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int id;

	int grade;

}
