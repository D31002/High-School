package com.Relationship_Management_Service.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class StudentClassRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    int studentId;
    int classRoomId;
}
