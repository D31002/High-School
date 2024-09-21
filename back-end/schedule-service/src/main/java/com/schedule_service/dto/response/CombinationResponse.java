package com.schedule_service.dto.response;


import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CombinationResponse {
	 int id;
	 String name;
	 Set<SubjectResponse> subjects;
}
