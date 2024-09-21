package com.profile_service.models;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class AddressProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    int houseNumber;
    String street;
    String ward;
    String district;
    String city;

}
