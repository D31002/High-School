package com.schedule_service.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ClassEntityResponse {
	 int id;
     String name;
     GradeResponse grade;
     TeacherResponse classTeacher;
     SchoolYearResponse schoolYear;
     CombinationResponse combination;
}
