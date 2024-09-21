package com.classRoom_service.service;

import java.util.*;

import com.classRoom_service.Exception.AppException;
import com.classRoom_service.Exception.ErrorCode;
import com.classRoom_service.Mapper.ClassEntityMapper;
import com.classRoom_service.Models.ClassEntity;
import com.classRoom_service.Models.Grade;
import com.classRoom_service.dto.request.ArrayIdRequest;
import com.classRoom_service.dto.request.ClassEntityRequest;
import com.classRoom_service.dto.response.*;
import com.classRoom_service.repository.ClassEntityRepository;
import com.classRoom_service.repository.GradeRepository;
import com.classRoom_service.repository.HttpClient.*;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class ClassEntityService{

	ClassEntityRepository classEntityRepository;
	GradeRepository gradeRepository;
	ClassEntityMapper classEntityMapper;
	TeacherClient teacherClient;
	SchoolYearSemesterClient schoolYearSemesterClient;
	StudentClassRoomClient studentClassRoomClient;
	SubjectClient subjectClient;
	ScheduleClient scheduleClient;

	private ClassEntityResponse mapToClassEntityResponse(ClassEntity classEntity){
		ClassEntityResponse classEntityResponse = classEntityMapper.toClassEntityResponse(classEntity);
		try{
			classEntityResponse.setClassTeacher(teacherClient.getTeacherById(classEntity.getClassTeacherId()).getResult());
		}catch (Exception e){
			classEntityResponse.setClassTeacher(null);
		}
		classEntityResponse.setSchoolYear(schoolYearSemesterClient.getSchoolYearBySchoolYearId(classEntity.getSchoolYearId()).getResult());
		classEntityResponse.setCombination(subjectClient.getById(classEntity.getCombinationId()).getResult());
		return classEntityResponse;
	}

	public ClassEntityResponse getById(int id) {
		ClassEntity classEntity = classEntityRepository.findById(id)
				.orElseThrow(() -> new AppException(ErrorCode.CLASS_NOT_EXISTED));
		return mapToClassEntityResponse(classEntity);
	}

	public ClassEntityResponse getClassRoomByClassTeacher(int classTeacherId, int schoolYearId) {
		ClassEntity classEntity =
				classEntityRepository.findByClassTeacherIdAndSchoolYearId(classTeacherId,schoolYearId);

		return mapToClassEntityResponse(classEntity);
	}

	public ClassEntityResponse getClassRoomNOWofStudent(int studentId, int schoolYearId) {
		List<ArrClassRoomResponse> arrClassRoomResponseList =
				studentClassRoomClient.getClassRoomIdByStudentId(studentId).getResult();
		List<Integer> classRoomIds = arrClassRoomResponseList.stream()
				.map(ArrClassRoomResponse::getClassRoomId)
				.toList();

		ClassEntity classEntity = classEntityRepository.findByClassRoomIdsAndSchoolYearId(classRoomIds,schoolYearId);
		return mapToClassEntityResponse(classEntity);
	}

	public PageResponse<ClassEntityResponse> getAllBySchoolYear(
			int schoolYearId,int page,int pageSize, String keyword) {

		if(schoolYearId == -1){
			return new PageResponse<>();
		}

		Sort sort = Sort.by("name").ascending();
		Pageable pageable = PageRequest.of(page - 1,pageSize,sort);

		Page<ClassEntity> classEntityList = classEntityRepository
					.findBySchoolYearIdAndKeyWord(schoolYearId,keyword,pageable);

		List<ClassEntityResponse> classEntityResponseList = classEntityList.stream()
				.map(this::mapToClassEntityResponse).toList();

		return PageResponse.<ClassEntityResponse>builder()
				.currentPage(page)
				.pageSize(classEntityList.getSize())
				.totalPages(classEntityList.getTotalPages())
				.totalElements(classEntityList.getTotalElements())
				.data(classEntityResponseList)
				.build();

	}

	public List<ClassEntityResponse> getAllBySchoolYearNotPagination(int schoolYearId) {

		List<ClassEntity> classEntityList =
				classEntityRepository.findBySchoolYearId(schoolYearId);

		return classEntityList.stream().map(this::mapToClassEntityResponse).toList();
	}

	public List<ClassEntityResponse> getAllBySchoolYearAndGrade(Integer schoolYearId, Integer gradeId, String keyword) {

		List<ClassEntity> classEntityList =
				classEntityRepository.findBySchoolYearIdAndGradeAndKeyWord(schoolYearId,gradeId,keyword);

		return classEntityList.stream()
				.sorted(Comparator.comparing(ClassEntity::getName))
				.map(this::mapToClassEntityResponse)
				.toList();
	}

	public List<ClassEntityResponse> getAllClassRoomOfTeacher(int teacherId,int schoolYearId,Integer gradeId) {
		if(schoolYearId == -1){
			return new ArrayList<>();
		}
		List<ClassRoomIdOfTeacherResponse> responseList =
				scheduleClient.getClassRoomIdsOfTeacher(teacherId,schoolYearId).getResult();

		return responseList.stream()
				.map(r -> getById(r.getClassRoomId()))
				.filter(classEntityResponse -> gradeId == null || classEntityResponse.getGrade().getId() == gradeId)
				.toList();
	}

	public ClassEntityResponse createClass(int schoolYearId, int gradeId,
										   ClassEntityRequest request) {
		boolean existsByNameOfSchoolYear =
				classEntityRepository.existsByNameOfSchoolYear(schoolYearId,request.getName());
		if(existsByNameOfSchoolYear){
			throw new AppException(ErrorCode.CLASS_EXISTED);
		}
		TeacherResponse teacherResponse = teacherClient.getTeacherById(request.getTeacherId()).getResult();
		SchoolYearResponse schoolYearResponse = schoolYearSemesterClient.getSchoolYearBySchoolYearId(schoolYearId).getResult();
		CombinationResponse combinationResponse = subjectClient.getById(request.getCombinationId()).getResult();

		Grade grade = gradeRepository.findById(gradeId)
				.orElseThrow(() -> new AppException(ErrorCode.GRADE_NOT_EXISTED));

		boolean teacherExistsInYear  =
				classEntityRepository.existsByClassTeacherAndSchoolYear(request.getTeacherId(),schoolYearId);

		if(teacherExistsInYear){
			throw new AppException(ErrorCode.TEACHER_ALREADY_ASSIGNED);
		}

		ClassEntityResponse classEntityResponse = classEntityMapper.toClassEntityResponse(
				classEntityRepository.save(ClassEntity.builder()
						.name(request.getName())
						.schoolYearId(schoolYearId)
						.grade(grade)
						.classTeacherId(request.getTeacherId())
						.combinationId(request.getCombinationId())
						.build()));

		classEntityResponse.setClassTeacher(teacherResponse);
		classEntityResponse.setSchoolYear(schoolYearResponse);
		classEntityResponse.setCombination(combinationResponse);
		return classEntityResponse;
	}

	
	public ClassEntityResponse editClass(int classEntityId, int schoolYearId, int gradeId,
										 ClassEntityRequest request) {

		ClassEntity classEntity = classEntityRepository.findById(classEntityId)
				.orElseThrow(() -> new AppException(ErrorCode.CLASS_NOT_EXISTED));

		Grade grade = gradeRepository.findById(gradeId)
				.orElseThrow(() -> new AppException(ErrorCode.GRADE_NOT_EXISTED));

		if(classEntity.getClassTeacherId() != request.getTeacherId()){
			boolean teacherExistsInYear  =
					classEntityRepository.existsByClassTeacherAndSchoolYear(request.getTeacherId(),schoolYearId);
			if(teacherExistsInYear)
				throw new AppException(ErrorCode.TEACHER_ALREADY_ASSIGNED);

		}


		classEntityMapper.updateClassEntity(classEntity,request);
		classEntity.setClassTeacherId(request.getTeacherId());
		classEntity.setGrade(grade);
		classEntity.setSchoolYearId(schoolYearId);
		classEntity.setCombinationId(request.getCombinationId());

		return classEntityMapper.toClassEntityResponse(classEntityRepository.save(classEntity));

	}

	
	public void deleteClass(ArrayIdRequest request) {
		request.getArrId().forEach(id -> {
			ClassEntity classEntity = classEntityRepository.findById(id)
					.orElseThrow(() -> new AppException(ErrorCode.CLASS_NOT_EXISTED));

			List<StudentClassRoomResponse> studentClassRoomResponseList =
					studentClassRoomClient.getStudentIdByClassRoomId(id).getResult();
			if(!CollectionUtils.isEmpty(studentClassRoomResponseList)){
				throw new AppException(ErrorCode.CLASS_HAS_STUDENTS);
			}

			classEntityRepository.delete(classEntity);
		});
    }

	
	public void cpyData(int schoolYearId) {
		if (!classEntityRepository.findBySchoolYearId(schoolYearId).isEmpty())
			throw new AppException(ErrorCode.CLASS_EXISTED);

		SchoolYearResponse schoolYearResponseNOW =
				schoolYearSemesterClient.getSchoolYearBySchoolYearId(schoolYearId).getResult();

		SchoolYearResponse schoolYearResponseOLD = schoolYearSemesterClient.getSchoolYearBySchoolYear(schoolYearResponseNOW.getSchoolYear() -1).getResult();
		List<ClassEntity> classEntityList = classEntityRepository.findBySchoolYearId(schoolYearResponseOLD.getId());

		if(classEntityList.isEmpty())
			throw new AppException(ErrorCode.NO_DATA);

		Set<ClassEntity> newClassEntities = new HashSet<>();
		for (ClassEntity classEntity : classEntityList) {
			ClassEntity newClassEntity = ClassEntity.builder()
					.name(classEntity.getName())
					.grade(classEntity.getGrade())
					.schoolYearId(schoolYearId)
					.combinationId(classEntity.getCombinationId())
					.build();
			newClassEntities.add(newClassEntity);
		}
		classEntityRepository.saveAll(newClassEntities);
	}

	//internal
}
