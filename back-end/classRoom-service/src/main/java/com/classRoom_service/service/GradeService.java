package com.classRoom_service.service;


import java.util.List;
import java.util.stream.Collectors;

import com.classRoom_service.Mapper.GradeMapper;
import com.classRoom_service.Models.Grade;
import com.classRoom_service.dto.response.GradeResponse;
import com.classRoom_service.repository.GradeRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class GradeService{
	GradeRepository gradeRepository;
	GradeMapper gradeMapper;


	public List<GradeResponse> getAll() {
		List<Grade> gradeList = gradeRepository.findAll();
		return gradeList.stream().map(gradeMapper::toGradeResponse).collect(Collectors.toList());
	}
}
