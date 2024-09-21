package com.Relationship_Management_Service.service;

import com.Relationship_Management_Service.dto.response.ArrClassRoomResponse;
import com.Relationship_Management_Service.dto.response.StudentClassRoomResponse;
import com.Relationship_Management_Service.mapper.StudentClassRoomMapper;
import com.Relationship_Management_Service.models.StudentClassRoom;
import com.Relationship_Management_Service.models.TeacherSubject;
import com.Relationship_Management_Service.repository.StudentClassRoomRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class StudentClassRoomService {
    StudentClassRoomRepository studentClassRoomRepository;
    StudentClassRoomMapper studentClassRoomMapper;

    public List<StudentClassRoomResponse> getStudentIdByClassRoomId(int classRoomId) {
        return studentClassRoomRepository.findByClassRoomId(classRoomId).stream()
                .map(studentClassRoomMapper::toStudentClassRoomResponse)
                .collect(Collectors.toList());
    }

    public List<ArrClassRoomResponse> getClassRoomIdByStudentId(int studentId) {
        return studentClassRoomRepository.findByStudentId(studentId).stream()
                .map(studentClassRoomMapper::toArrClassRoomResponse)
                .toList();
    }

    public Set<StudentClassRoomResponse> getAllStudentId() {
        Set<StudentClassRoom> studentClassRooms =
                new HashSet<>(studentClassRoomRepository.findAll());

        return studentClassRooms.stream()
                .map(studentClassRoom -> new StudentClassRoomResponse(studentClassRoom.getStudentId()))
                .collect(Collectors.toSet());
    }

    public void addStudentIdInClassRoomId(int studentId, int classRoomId) {
        studentClassRoomRepository.save(StudentClassRoom.builder()
                .studentId(studentId)
                .classRoomId(classRoomId)
                .build());
    }


    public void deleteStudentIdInClassRoomId(int studentId, int classRoomId) {
        StudentClassRoom studentClassRoom =
                studentClassRoomRepository.findByStudentIdAndClassRoomId(studentId,classRoomId);
        studentClassRoomRepository.delete(studentClassRoom);
    }



}
