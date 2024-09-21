package com.Relationship_Management_Service.service;

import com.Relationship_Management_Service.dto.response.ArrParentResponse;
import com.Relationship_Management_Service.mapper.StudentParentMapper;
import com.Relationship_Management_Service.models.StudentParent;
import com.Relationship_Management_Service.repository.StudentParentRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class StudentParentService {
    StudentParentRepository studentParentRepository;
    StudentParentMapper studentParentMapper;

    public void addStudentAndParent(int studentId, int parentId) {
        studentParentRepository.save(StudentParent.builder().studentId(studentId).parentId(parentId).build());
    }

    public List<ArrParentResponse> getParentOfStudent(int studentId) {
        return studentParentRepository.findByStudentId(studentId).stream()
                .map(studentParentMapper::toArrParentResponse)
                .collect(Collectors.toList());
    }
}
