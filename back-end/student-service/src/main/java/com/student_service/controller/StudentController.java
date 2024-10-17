package com.student_service.controller;

import com.student_service.dto.request.ArrayIdRequest;
import com.student_service.dto.request.StudentCreationRequest;
import com.student_service.dto.request.StudentEditRequest;
import com.student_service.dto.response.ApiResponse;
import com.student_service.dto.response.PageResponse;
import com.student_service.dto.response.StudentResponse;
import com.student_service.models.Status;
import com.student_service.service.ExcelService;
import com.student_service.service.StudentService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/pl")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class StudentController {

    StudentService studentService;
    ExcelService excelService;

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/getAllStatuses")
    ApiResponse<List<Status>> getAllStatuses(){
        List<Status> statuses = Status.getAllStatuses();
        return ApiResponse.<List<Status>>builder()
                .result(statuses)
                .build();
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('TEACHER')")
    @GetMapping("/getStudentById/{studentId}")
    ApiResponse<StudentResponse> getStudentById(@PathVariable int studentId){
        StudentResponse result = studentService.getStudentById(studentId);
        return ApiResponse.<StudentResponse>builder()
                .result(result)
                .build();
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('TEACHER')")
    @GetMapping("/getStudentByClassRoom")
    ApiResponse<PageResponse<StudentResponse>> getStudentByClassRoom(
            @RequestParam int classRoomId,
            @RequestParam(required = false,defaultValue = "1") int page,
            @RequestParam(required = false,defaultValue = "7") int pageSize,
            @RequestParam(required = false) String keyword){
        return ApiResponse.<PageResponse<StudentResponse>>builder()
                .result(studentService.getStudentByClassRoom(classRoomId,page,pageSize,keyword))
                .build();
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('TEACHER')")
    @GetMapping("/getStudentByClassRoomNotPage")
    ApiResponse<List<StudentResponse>> getStudentByClassRoomNotPage(
            @RequestParam int classRoomId){
        return ApiResponse.<List<StudentResponse>>builder()
                .result(studentService.getStudentByClassRoomNotPage(classRoomId))
                .build();
    }


    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/getStudentNotClassRoom")
    ApiResponse<List<StudentResponse>> getStudentNotClassRoom(){
        List<StudentResponse> result = studentService.getStudentNotClassRoom();
        return ApiResponse.<List<StudentResponse>>builder()
                .result(result)
                .build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/createStudent")
    ApiResponse<StudentResponse> createStudent(@RequestParam int classRoomId,
                                               @RequestBody StudentCreationRequest request){
        StudentResponse result = studentService.createStudent(classRoomId,request);
        return ApiResponse.<StudentResponse>builder()
                .result(result)
                .build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/addStudentExisted")
    ApiResponse<Void> addStudentExisted(@RequestParam int classRoomId,@RequestParam int studentId){
        studentService.addStudentExisted(classRoomId,studentId);
        return ApiResponse.<Void>builder()
                .build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/createStudentFromExcel")
    ApiResponse<String> createStudentFromExcel(
            @RequestParam int classRoomId,
            @RequestParam("file") MultipartFile file) throws IOException {
        studentService.createStudentFromExcel(classRoomId,file);
        return ApiResponse.<String>builder()
                .result("Thành công")
                .build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/editStudent/{studentId}")
    ApiResponse<StudentResponse> editStudent(@PathVariable int studentId,
                                             @RequestBody StudentEditRequest request){
        StudentResponse result = studentService.editStudent(studentId,request);
        return ApiResponse.<StudentResponse>builder()
                .result(result)
                .build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/deleteStudent")
    ApiResponse<String> deleteStudent(@RequestParam int classRoomId,
                                      @RequestBody ArrayIdRequest request){
        studentService.deleteStudent(classRoomId,request);
        return ApiResponse.<String>builder()
                .result("Thành công")
                .build();
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('TEACHER')")
    @GetMapping("/export")
    ResponseEntity<Resource> exportStudentDataToExcel(@RequestParam int classRoomId){
        return studentService.exportStudentDataToExcel(classRoomId);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/AddStudentsHasAcademicResultAboveAverageFromOldYear")
    ApiResponse<List<StudentResponse>> AddStudentsHasAcademicResultAboveAverageFromOldYear(
            @RequestParam int classRoomIdOld,
            @RequestParam int classRoomIdNew){
        List<StudentResponse> result =
                studentService.AddStudentsHasAcademicResultAboveAverageFromOldYear(classRoomIdOld,classRoomIdNew);
        return ApiResponse.<List<StudentResponse>>builder()
                .result(result)
                .build();
    }
}
