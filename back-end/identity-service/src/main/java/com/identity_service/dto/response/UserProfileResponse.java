package com.identity_service.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserProfileResponse {
	 int id;
	 LocalDate birthday;
	 String phoneNumber;
	 int gender;
	 String imageUrl;
	 String email;
	 String ethnicity;
	 String nationality;
	 AddressProfileResponse address;

	 TeacherResponse teacherResponse;
//	StudentResponse studentResponse;
//	ParentResponse parentResponse;
}
