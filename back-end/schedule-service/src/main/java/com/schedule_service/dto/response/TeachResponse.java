package com.schedule_service.dto.response;

import com.schedule_service.models.Lesson;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.DayOfWeek;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TeachResponse {
	SchoolYearResponse schoolYearResponse;

	List<TeachDetailsResponse> teachDetails;
}
