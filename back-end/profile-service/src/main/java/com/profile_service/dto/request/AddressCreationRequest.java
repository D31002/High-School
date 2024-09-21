package com.profile_service.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AddressCreationRequest {
    int houseNumber;
    String street;
    String ward;
    String district;
    String city;
}
