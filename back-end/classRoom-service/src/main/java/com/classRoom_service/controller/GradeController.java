package com.classRoom_service.controller;

import com.classRoom_service.dto.response.ApiResponse;
import com.classRoom_service.dto.response.GradeResponse;
import com.classRoom_service.service.GradeService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/pl/grade")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class GradeController {

	GradeService gradeService;

	@GetMapping("/getAll")
	public ApiResponse<List<GradeResponse>> getALlGrade(){
		List<GradeResponse> result = gradeService.getAll();
		return ApiResponse.<List<GradeResponse>>builder()
				.result(result)
				.build();
	}
}
