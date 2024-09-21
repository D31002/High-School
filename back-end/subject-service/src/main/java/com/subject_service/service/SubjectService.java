package com.subject_service.service;

import com.subject_service.Exception.AppException;
import com.subject_service.Exception.ErrorCode;
import com.subject_service.Mapper.SubjectMapper;
import com.subject_service.dto.response.SubjectResponse;
import com.subject_service.models.Subject;
import com.subject_service.repository.SubjectRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class SubjectService {

	SubjectRepository subjectRepository;
	SubjectMapper subjectMapper;

	public List<SubjectResponse> getAllSubject(String keyword) {

		List<Subject> subjectList = subjectRepository.findAllByKeyWord(keyword);

		return subjectList.stream().map(subjectMapper::toSubjectResponse).toList();
	}

	public SubjectResponse getById(int id) {
		return subjectMapper.toSubjectResponse(
				subjectRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.SUBJECT_NOT_EXISTED))
		);
	}
}
