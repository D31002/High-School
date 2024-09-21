package com.schedule_service.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserProfileResponse {
	 int id;
	 String fullName;
	 LocalDate birthday;
	 String phoneNumber;
	 int gender;
	 String imageUrl;
	 String email;
	 String ethnicity;
	 String nationality;
	 String userType;
	 UserResponse userResponse;
	 AddressProfileResponse address;


}
