package com.Relationship_Management_Service.controller;

import com.Relationship_Management_Service.dto.response.*;
import com.Relationship_Management_Service.service.StudentClassRoomService;
import com.Relationship_Management_Service.service.StudentParentService;
import com.Relationship_Management_Service.service.TeacherSubjectService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/internal")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class InternalController {

    TeacherSubjectService teacherSubjectService;
    StudentClassRoomService studentClassRoomService;
    StudentParentService studentParentService;

    @GetMapping("/teacherSubject/getTeacherIdBySubjectId")
    ApiResponse<List<TeacherSubjectResponse>> getTeacherIdBySubjectId(@RequestParam int subjectId){
        List<TeacherSubjectResponse> result = teacherSubjectService.getTeacherIdBySubjectId(subjectId);
        return ApiResponse.<List<TeacherSubjectResponse>>builder()
                .result(result)
                .build();
    }

    @GetMapping("/teacherSubject/getSubjectIdByTeacherId")
    ApiResponse<List<ArrSubjectResponse>> getSubjectIdByTeacherId(@RequestParam int teacherId){
        List<ArrSubjectResponse> result = teacherSubjectService.getSubjectIdByTeacherId(teacherId);
        return ApiResponse.<List<ArrSubjectResponse>>builder()
                .result(result)
                .build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/teacherSubject/addTeacherIdInSubjectId")
    ApiResponse<Void> addTeacherIdInSubjectId(@RequestParam int teacherId,@RequestParam int subjectId){
        teacherSubjectService.addTeacherIdInSubjectId(teacherId,subjectId);
        return ApiResponse.<Void>builder()
                .build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/teacherSubject/deleteTeacherIdInSubjectId")
    ApiResponse<Void> deleteTeacherIdInSubjectId(@RequestParam int teacherId,@RequestParam int subjectId){
        teacherSubjectService.deleteTeacherIdInSubjectId(teacherId,subjectId);
        return ApiResponse.<Void>builder()
                .build();
    }


    //STUDENT
    @GetMapping("/studentClassRoom/getClassRoomIdByStudentId")
    ApiResponse<List<ArrClassRoomResponse>> getClassRoomIdByStudentId(@RequestParam int studentId){
        List<ArrClassRoomResponse> result = studentClassRoomService.getClassRoomIdByStudentId(studentId);
        return ApiResponse.<List<ArrClassRoomResponse>>builder()
                .result(result)
                .build();
    }

    @GetMapping("/studentClassRoom/getAllStudentId")
    ApiResponse<Set<StudentClassRoomResponse>> getAllStudentId(){
        Set<StudentClassRoomResponse> result = studentClassRoomService.getAllStudentId();
        return ApiResponse.<Set<StudentClassRoomResponse>>builder()
                .result(result)
                .build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/studentClassRoom/addStudentIdInClassRoomId")
    ApiResponse<Void> addStudentIdInClassRoomId(@RequestParam int studentId,@RequestParam int classRoomId){
        studentClassRoomService.addStudentIdInClassRoomId(studentId,classRoomId);
        return ApiResponse.<Void>builder()
                .build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/studentClassRoom/deleteStudentIdInClassRoomId")
    ApiResponse<Void> deleteStudentIdInClassRoomId(@RequestParam int studentId,@RequestParam int classRoomId){
        studentClassRoomService.deleteStudentIdInClassRoomId(studentId,classRoomId);
        return ApiResponse.<Void>builder()
                .build();
    }


    //studentParent
    @PostMapping("/studentParent/addStudentAndParent")
    ApiResponse<Void> addStudentAndParent(@RequestParam int studentId,@RequestParam int parentId){
        studentParentService.addStudentAndParent(studentId,parentId);
        return ApiResponse.<Void>builder()
                .build();
    }

    @GetMapping("/studentParent/getParentOfStudent")
    ApiResponse<List<ArrParentResponse>> getParentOfStudent(@RequestParam int studentId){
        List<ArrParentResponse> result = studentParentService.getParentOfStudent(studentId);
        return ApiResponse.<List<ArrParentResponse>>builder()
                .result(result)
                .build();
    }
}
