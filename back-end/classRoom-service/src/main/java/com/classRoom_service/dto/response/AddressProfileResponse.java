package com.classRoom_service.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AddressProfileResponse {
     Long id;
     int houseNumber;
     String street;
     String hamlet;
     String ward;
     String district;
     String city;
}
