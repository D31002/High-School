package com.subject_service.controller;

import com.subject_service.dto.response.ApiResponse;
import com.subject_service.dto.response.SubjectResponse;
import com.subject_service.service.SubjectService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pl")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class SubjectController {

	SubjectService subjectService;

	@GetMapping("/subject/getById/{id}")
	ApiResponse<SubjectResponse> getById(@PathVariable int id){
		SubjectResponse result = subjectService.getById(id);
		return ApiResponse.<SubjectResponse>builder()
				.result(result)
				.build();
	}

	@GetMapping("/subject/getAll")
	ApiResponse<List<SubjectResponse>> getAllSubject(@RequestParam(required = false) String keyword){
		List<SubjectResponse> result = subjectService.getAllSubject(keyword);
		return ApiResponse.<List<SubjectResponse>>builder()
				.result(result)
				.build();
	}
}
