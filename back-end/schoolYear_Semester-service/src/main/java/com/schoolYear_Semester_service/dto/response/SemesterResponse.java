package com.schoolYear_Semester_service.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SemesterResponse {
	int id;

	String code;
	String name;

	int startDay;
	int startMonth;

	int endDay;
	int endMonth;

}
