package com.Relationship_Management_Service.service;

import com.Relationship_Management_Service.dto.response.ArrSubjectResponse;
import com.Relationship_Management_Service.dto.response.TeacherSubjectResponse;
import com.Relationship_Management_Service.mapper.TeacherSubjectMapper;
import com.Relationship_Management_Service.models.TeacherSubject;
import com.Relationship_Management_Service.repository.TeacherSubjectRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class TeacherSubjectService {

    TeacherSubjectRepository teacherSubjectRepository;
    TeacherSubjectMapper teacherSubjectMapper;

    public List<TeacherSubjectResponse> getTeacherIdBySubjectId(int subjectId) {
        return teacherSubjectRepository.findBySubjectId(subjectId).stream()
                .map(teacherSubjectMapper::toTeacherSubjectResponse)
                .collect(Collectors.toList());
    }

    public List<ArrSubjectResponse> getSubjectIdByTeacherId(int teacherId) {
        return teacherSubjectRepository.findByTeacherId(teacherId).stream()
                .map(teacherSubjectMapper::toArrSubjectResponse)
                .collect(Collectors.toList());
    }

    public void addTeacherIdInSubjectId(int teacherId, int subjectId) {
        teacherSubjectRepository.save(TeacherSubject.builder()
                .subjectId(subjectId)
                .teacherId(teacherId)
                .build());
    }

    public void deleteTeacherIdInSubjectId(int teacherId, int subjectId) {
        TeacherSubject teacherSubject =
                teacherSubjectRepository.findByTeacherIdAndSubjectId(teacherId,subjectId);
        teacherSubjectRepository.delete(teacherSubject);
    }

}
