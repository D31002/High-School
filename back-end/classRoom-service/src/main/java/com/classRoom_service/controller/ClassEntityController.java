package com.classRoom_service.controller;

import com.classRoom_service.dto.request.ArrayIdRequest;
import com.classRoom_service.dto.request.ClassEntityRequest;
import com.classRoom_service.dto.response.ApiResponse;
import com.classRoom_service.dto.response.ClassEntityResponse;
import com.classRoom_service.dto.response.PageResponse;
import com.classRoom_service.service.ClassEntityService;
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
public class ClassEntityController {
	
	ClassEntityService classEntityService;

	@GetMapping("/getById/{Id}")
	ApiResponse<ClassEntityResponse> getById(@PathVariable int Id) {
		ClassEntityResponse result = classEntityService.getById(Id);
		return ApiResponse.<ClassEntityResponse>builder()
				.result(result)
				.build();
	}
	@PreAuthorize("hasRole('ADMIN') or hasRole('TEACHER')")
	@GetMapping("/getClassRoomByClassTeacher")
	ApiResponse<ClassEntityResponse> getClassRoomByClassTeacher(
			@RequestParam int classTeacherId,
			@RequestParam int schoolYearId
	) {
		ClassEntityResponse result = classEntityService.getClassRoomByClassTeacher(classTeacherId,schoolYearId);
		return ApiResponse.<ClassEntityResponse>builder()
				.result(result)
				.build();
	}

	@PreAuthorize("hasRole('STUDENT')")
	@GetMapping("/getClassRoomNOWofStudent")
	ApiResponse<ClassEntityResponse> getClassRoomNOWofStudent(
			@RequestParam int studentId,
			@RequestParam int schoolYearId) {
		ClassEntityResponse result = classEntityService.getClassRoomNOWofStudent(studentId,schoolYearId);
		return ApiResponse.<ClassEntityResponse>builder()
				.result(result)
				.build();
	}
	@PreAuthorize("hasRole('ADMIN') or hasRole('TEACHER')")
	@GetMapping("/getAllBySchoolYear")
	ApiResponse<PageResponse<ClassEntityResponse>> getAllBySchoolYear(
			@RequestParam(required = false) int schoolYearId,
			@RequestParam(required = false,defaultValue = "1") int page,
			@RequestParam(required = false,defaultValue = "7") int pageSize,
			@RequestParam(required = false) String keyword) {
		return ApiResponse.<PageResponse<ClassEntityResponse>>builder()
				.result(classEntityService.getAllBySchoolYear(schoolYearId,page,pageSize,keyword))
				.build();
	}

	@GetMapping("/getAllBySchoolYearAndGrade")
	ApiResponse<List<ClassEntityResponse>> getAllBySchoolYearAndGrade(
			@RequestParam Integer schoolYearId,
			@RequestParam(required = false) Integer gradeId,
			@RequestParam(required = false) String keyword) {
		List<ClassEntityResponse> result = classEntityService.getAllBySchoolYearAndGrade(schoolYearId,gradeId,keyword);
		return ApiResponse.<List<ClassEntityResponse>>builder()
				.result(result)
				.build();
	}

	@GetMapping("/getAllBySchoolYearNotPagination")
	ApiResponse<List<ClassEntityResponse>> getAllBySchoolYearNotPagination(
			@RequestParam int schoolYearId) {
		return ApiResponse.<List<ClassEntityResponse>>builder()
				.result(classEntityService.getAllBySchoolYearNotPagination(schoolYearId))
				.build();
	}

	@PreAuthorize("hasRole('TEACHER')")
	@GetMapping("/getAllClassRoomOfTeacher")
	ApiResponse<List<ClassEntityResponse>> getAllClassRoomOfTeacher(
			@RequestParam int teacherId,
			@RequestParam int schoolYearId,
			@RequestParam(required = false) Integer gradeId
	) {
		return ApiResponse.<List<ClassEntityResponse>>builder()
				.result(classEntityService.getAllClassRoomOfTeacher(teacherId,schoolYearId,gradeId))
				.build();
	}

	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/createClass")
	ApiResponse<ClassEntityResponse> CreateClass(@RequestParam int schoolYearId,
												 @RequestParam int gradeId,
												 @RequestBody ClassEntityRequest request){
		ClassEntityResponse result = classEntityService.createClass(schoolYearId,gradeId,request);
		return ApiResponse.<ClassEntityResponse>builder()
				.result(result)
				.build();
	}

	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping("/editClass/{classEntityId}")
	ApiResponse<ClassEntityResponse> EditClass(@PathVariable int classEntityId,
											   @RequestParam int schoolYearId,
											   @RequestParam int gradeId,
											   @RequestBody ClassEntityRequest request){
		ClassEntityResponse result = classEntityService.editClass(classEntityId,
				schoolYearId,gradeId,request);

		return ApiResponse.<ClassEntityResponse>builder()
				.result(result)
				.build();
	}

	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/deleteClass")
	ApiResponse<String> DeleteClass(@RequestBody ArrayIdRequest request){
		classEntityService.deleteClass(request);
		return ApiResponse.<String>builder()
				.result("Xóa thành công")
				.build();
    }


	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/cpyData")
	ApiResponse<String> CpyData(@RequestParam int schoolYearId){
		classEntityService.cpyData(schoolYearId);
		return ApiResponse.<String>builder()
				.result("Dữ liệu đã được sao chép")
				.build();
	}

}
