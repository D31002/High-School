package com.Relationship_Management_Service.repository;

import com.Relationship_Management_Service.dto.response.ArrClassRoomResponse;
import com.Relationship_Management_Service.models.StudentClassRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentClassRoomRepository extends JpaRepository<StudentClassRoom,Integer> {
    List<StudentClassRoom> findByClassRoomId(int classRoomId);

    StudentClassRoom findByStudentIdAndClassRoomId(int studentId, int classRoomId);

    List<StudentClassRoom> findByStudentId(int studentId);
}
