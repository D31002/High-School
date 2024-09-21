package com.profile_service.models;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class UserProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    String fullName;
    LocalDate birthday;
    String phoneNumber;
    int gender;
    String imageUrl;
    String email;
    String ethnicity;
    String nationality;
    @Enumerated(EnumType.STRING)
    UserType userType;

    @Column(unique = true)
    Integer userId;

    @ManyToOne
    @JoinColumn(name = "address_id")
    AddressProfile address;
}
