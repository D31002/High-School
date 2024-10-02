package com.teacher_service.Controller;

import com.teacher_service.dto.request.ArrayIdRequest;
import com.teacher_service.dto.request.TeacherCreationRequest;
import com.teacher_service.dto.response.ApiResponse;
import com.teacher_service.dto.response.PageResponse;
import com.teacher_service.dto.response.TeacherResponse;
import com.teacher_service.service.TeacherService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pl")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class TeacherController {

    TeacherService teacherService;

    @GetMapping("/getTeacherById/{id}")
    ApiResponse<TeacherResponse> getTeacherById(@PathVariable int id){
        TeacherResponse result = teacherService.getTeacherById(id);
        return ApiResponse.<TeacherResponse>builder()
                .result(result)
                .build();
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('TEACHER')")
    @GetMapping("/getAllTeacher")
    ApiResponse<List<TeacherResponse>> getAllTeacher(){
        List<TeacherResponse> result = teacherService.getAllTeacher();
        return ApiResponse.<List<TeacherResponse>>builder()
                .result(result)
                .build();
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('TEACHER')")
    @GetMapping("/getAllTeacherBySubjectId")
    ApiResponse<PageResponse<TeacherResponse>> getAllTeacherBySubjectId(
            @RequestParam(required = false) int subjectId,
            @RequestParam(required = false,defaultValue = "1") int page,
            @RequestParam(required = false,defaultValue = "7") int pageSize,
            @RequestParam(required = false) String keyword){
        return ApiResponse.<PageResponse<TeacherResponse>>builder()
                .result(teacherService.getAllTeacherBySubjectId(subjectId,page,pageSize,keyword))
                .build();
    }

    @GetMapping("/getAllTeacherBySubjectIdNotPagination")
    ApiResponse<List<TeacherResponse>> getAllTeacherBySubjectIdNotPagination(
            @RequestParam int subjectId){
        return ApiResponse.<List<TeacherResponse>>builder()
                .result(teacherService.getAllTeacherBySubjectIdNotPagination(subjectId))
                .build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/getTeachersNotBySubjectId")
    ApiResponse<List<TeacherResponse>> getTeachersNotBySubjectId(@RequestParam(required = false) int subjectId,
                                                                 @RequestParam(required = false) String keyword) {
        List<TeacherResponse> result = teacherService.getTeachersNotBySubjectId(subjectId,keyword);
        return ApiResponse.<List<TeacherResponse>>builder()
                .result(result)
                .build();
    }


    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/createTeacher")
    ApiResponse<TeacherResponse> createTeacher(@RequestParam int subjectId,@RequestBody TeacherCreationRequest request){
        TeacherResponse result = teacherService.createTeacher(subjectId,request);
        return ApiResponse.<TeacherResponse>builder()
                .result(result)
                .build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/createTeacherFromExcel")
    ApiResponse<String> createTeacherFromExcel(@RequestParam int subjectId,@RequestBody List<TeacherCreationRequest> request){
        teacherService.createTeacherFromExcel(subjectId,request);
        return ApiResponse.<String>builder()
                .result("Thành công")
                .build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/addTeacherExisted")
    ApiResponse<Void> addTeacherExisted(@RequestParam int subjectId,@RequestParam int teacherId){
        teacherService.addTeacherExisted(subjectId,teacherId);
        return ApiResponse.<Void>builder()
                .build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/editTeacher/{teacherId}")
    ApiResponse<TeacherResponse> editTeacher(@PathVariable int teacherId,@RequestBody TeacherCreationRequest request){
        TeacherResponse result = teacherService.editTeacher(teacherId,request);
        return ApiResponse.<TeacherResponse>builder()
                .result(result)
                .build();
    }
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/deleteTeacher")
    ApiResponse<String> deleteTeacher(@RequestParam int subjectId,@RequestBody ArrayIdRequest request){
        teacherService.deleteTeacher(subjectId,request);
        return ApiResponse.<String>builder()
                .result("Xóa thành công")
                .build();
    }




}
