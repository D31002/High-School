package com.schedule_service.service;

import java.time.DayOfWeek;
import java.util.*;
import java.util.stream.Collectors;

import com.schedule_service.Exception.AppException;
import com.schedule_service.Exception.ErrorCode;
import com.schedule_service.Mapper.LessonMapper;
import com.schedule_service.Mapper.TeachMapper;
import com.schedule_service.dto.request.AssignedLesson;
import com.schedule_service.dto.request.DataEditRequest;
import com.schedule_service.dto.request.DataSaveSchedulesRequest;
import com.schedule_service.dto.request.LessonPair;
import com.schedule_service.dto.response.*;
import com.schedule_service.models.Lesson;
import com.schedule_service.models.Teach;
import com.schedule_service.repository.HttpClient.*;
import com.schedule_service.repository.LessonRepository;
import com.schedule_service.repository.TeachRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;


@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class TeachService {
	TeachRepository teachRepository;
	LessonRepository lessonRepository;
	LessonMapper lessonMapper;
	TeachMapper teachMapper;
	ClassRoomClient classRoomClient;
	TeacherSubjectClient teacherSubjectClient;
	TeacherClient teacherClient;
	SubjectClient subjectClient;
	SchoolYearSemesterClient schoolYearSemesterClient;

	private Map<Integer,Integer> countClassesForEachSubject(List<ClassEntityResponse> classRoomList){
		Map<Integer, Integer> subjectClassCountMap = new HashMap<>();

		for (ClassEntityResponse classEntity : classRoomList){
			Set<SubjectResponse> subjects = classEntity.getCombination().getSubjects();

			for (SubjectResponse subject : subjects){
				Integer subjectId = subject.getId();

				if(subjectClassCountMap.containsKey(subjectId)){
					subjectClassCountMap.put(subjectId,subjectClassCountMap.get(subjectId) + 1);
				}else{
					subjectClassCountMap.put(subjectId,1);
				}
			}
		}
		return subjectClassCountMap;
	}

	public TeachResponse generateSchedules(int schoolYearId) {
		System.out.println("start");
		//Lấy danh sách lớp học
		List<ClassEntityResponse> classRoomList =
				classRoomClient.getAllBySchoolYearNotPagination(schoolYearId)
						.getResult();

		classRoomList.sort(Comparator.comparing(ClassEntityResponse::getName));

		Map<Integer, Integer> subjectClassCountMap = countClassesForEachSubject(classRoomList);
		System.out.println(subjectClassCountMap);

		Map<Integer, Integer> TeacherClassCountMap = new HashMap<>();

		if(CollectionUtils.isEmpty(classRoomList)){
			throw new AppException(ErrorCode.CLASS_NOT_EXISTED);
		}

		//Lấy danh sách tiết học
		List<Lesson> lessons = lessonRepository.findAll();

		//Xác định các ngày trong tuần, loại bỏ chủ nhật
		List<DayOfWeek> daysOfWeek = Arrays.stream(DayOfWeek.values())
				.filter(day -> day != DayOfWeek.SUNDAY)
				.toList();

		List<AssignedLesson> assignedLessons = new ArrayList<>();
		//Duyệt từng lớp học
		for (ClassEntityResponse classEntity : classRoomList) {
			//Lấy danh sách môn học của lớp
			Set<SubjectResponse> subjects = classEntity.getCombination().getSubjects();

			for (SubjectResponse subject : subjects) {
				List<TeacherSubjectResponse> teacherIdList = teacherSubjectClient.getTeacherIdBySubjectId(subject.getId()).getResult();
				if (teacherIdList.isEmpty()) {
					throw new AppException(ErrorCode.NO_TEACHER_FOUND);
				}
				//Lấy số tiết học tối đa trong tuần cho môn học
				int numberOfLessons = subject.getNumberOfLessons();

				//Lọc các tiết học có sẵn
				List<Lesson> availableLessons = new ArrayList<>(lessons);

				//Chọn ngẫu nhiên giáo viên
				int numberClassRoomOfSubject = subjectClassCountMap.get(subject.getId());
				int numberTeacherOfSubject = teacherIdList.size();
				int numberClassRoomOfTeacher = numberClassRoomOfSubject / numberTeacherOfSubject;
				int remainder = numberClassRoomOfSubject % numberTeacherOfSubject;
				int teacherId = selectTeacher(TeacherClassCountMap,teacherIdList,numberClassRoomOfTeacher,remainder);

				//Số tiết đã phân bổ
				int allocatedLessons = 0;

				if (numberOfLessons >= 2) {
					//Xử lý cho trường hợp số tiết học > 2
					while (allocatedLessons < numberOfLessons && !availableLessons.isEmpty()) {
						//Kiểm tra điều kiện thứ 2 tiết 1, thứ 7 tiết 5
						LessonPair lessonPair = filterLessonAndTeacher(daysOfWeek, availableLessons, assignedLessons, classEntity, teacherId);
						Lesson startLesson = lessonPair.getLesson();
						DayOfWeek dayOfWeek = lessonPair.getDayOfWeek();
						int finalTeacherId = lessonPair.getTeacherId();

						//Kiểm tra nếu số tiết còn lại >= 2
						if (numberOfLessons - allocatedLessons >= 2) {
							//lesson tiếp theo của startLesson
							Lesson nextLesson = getNextLesson(availableLessons, startLesson.getLesson() + 1);

							//Nếu tiết kế tiếp hợp lệ, thêm cả hai tiết vào danh sách
							if (nextLesson != null) {
								boolean isNextLessonValid = !((nextLesson.getLesson() == 5 && dayOfWeek == DayOfWeek.SATURDAY) ||
										(nextLesson.getLesson() == 1 && dayOfWeek == DayOfWeek.MONDAY)) &&
										assignedLessons.stream().noneMatch(al -> al.getLesson().equals(nextLesson)
												&& al.getDayOfWeek().equals(dayOfWeek) && al.getClassRoomId() == classEntity.getId())
										&& isTeacherAvailableForLesson(finalTeacherId, nextLesson, dayOfWeek, assignedLessons);
								if(isNextLessonValid){
										assignedLessons.add(new AssignedLesson(startLesson, finalTeacherId, subject.getId(), classEntity.getId(), dayOfWeek));
										assignedLessons.add(new AssignedLesson(nextLesson, finalTeacherId,subject.getId(),classEntity.getId(), dayOfWeek));
										allocatedLessons += 2;
								}else{
										assignedLessons.add(new AssignedLesson(startLesson, finalTeacherId,subject.getId(),classEntity.getId(), dayOfWeek));
										allocatedLessons++;
								}
							}
							else {
								assignedLessons.add(new AssignedLesson(startLesson, finalTeacherId, subject.getId(), classEntity.getId(), dayOfWeek));
								allocatedLessons++;
							}

						} else {
							//Nếu số tiết còn lại < 2, chỉ cần thêm tiết ngẫu nhiên
							assignedLessons.add(new AssignedLesson(startLesson, finalTeacherId,subject.getId(), classEntity.getId(), dayOfWeek));
							allocatedLessons++;
						}
					}
				} else {
					//Xử lý cho trường hợp số tiết học < 2
					LessonPair lessonPair = filterLessonAndTeacher(daysOfWeek, availableLessons, assignedLessons, classEntity, teacherId);
					Lesson lesson = lessonPair.getLesson();
					DayOfWeek dayOfWeek = lessonPair.getDayOfWeek();
					int finalTeacherId = lessonPair.getTeacherId();
					assignedLessons.add(new AssignedLesson(lesson, finalTeacherId,subject.getId(), classEntity.getId(), dayOfWeek));
				}
			}
		}
		System.out.println(TeacherClassCountMap);
		List<TeachDetailsResponse> teachDetailsResponseList = assignedLessons.stream()
				.map(entry -> createTeachResponse(entry, schoolYearId, assignedLessons.indexOf(entry)))
				.collect(Collectors.toList());

		return TeachResponse.builder()
				.schoolYearResponse(schoolYearSemesterClient.getSchoolYearBySchoolYearId(schoolYearId).getResult())
				.teachDetails(teachDetailsResponseList)
				.build();
	}

	public TeachResponse generateSchedules1(int schoolYearId) {
		System.out.println("start");
		//Lấy danh sách lớp học
		List<ClassEntityResponse> classRoomList = classRoomClient.getAllBySchoolYearNotPagination(schoolYearId).getResult();
		classRoomList.sort(Comparator.comparing(ClassEntityResponse::getName));

		Map<Integer, Integer> subjectClassCountMap = countClassesForEachSubject(classRoomList);
		System.out.println(subjectClassCountMap);

		Map<Integer, Integer> TeacherClassCountMap = new HashMap<>();

		if (classRoomList.isEmpty()){
			throw new AppException(ErrorCode.CLASS_NOT_EXISTED);
		}
		//Lấy danh sách tiết học
		List<Lesson> lessons = lessonRepository.findAll();

		//Xác định các ngày trong tuần, loại bỏ chủ nhật
		List<DayOfWeek> daysOfWeek = Arrays.stream(DayOfWeek.values()).filter(day -> day != DayOfWeek.SUNDAY).toList();

		//danh sách đã được được sắp xếp
		List<AssignedLesson> assignedLessons = new ArrayList<>();

		//Duyệt từng lớp học
		for (ClassEntityResponse classEntity : classRoomList) {
			//Lấy danh sách môn học của lớp
			Set<SubjectResponse> subjects = classEntity.getCombination().getSubjects();

			for (SubjectResponse subject : subjects) {
				List<TeacherSubjectResponse> teacherIdList = teacherSubjectClient.getTeacherIdBySubjectId(subject.getId()).getResult();
				if (teacherIdList.isEmpty()) {
					throw new AppException(ErrorCode.NO_TEACHER_FOUND);
				}
				//Lấy số tiết học tối đa trong tuần cho môn học
				int numberOfLessons = subject.getNumberOfLessons();

				//Lọc 10, 12: 1 - 5, 11: 6 - 9
				List<Lesson> availableLessons = new ArrayList<>(lessons);
				if (classEntity.getGrade().getId() == 1 || classEntity.getGrade().getId() == 3) {
					availableLessons.removeIf(lesson -> lesson.getLesson() >= 6 && lesson.getLesson() <= 9);
				} else if (classEntity.getGrade().getId() == 2) {
					availableLessons.removeIf(lesson -> lesson.getLesson() >= 1 && lesson.getLesson() <= 5);
				}
				//Chọn ngẫu nhiên giáo viên
				int numberClassRoomOfSubject = subjectClassCountMap.get(subject.getId());
				int numberTeacherOfSubject = teacherIdList.size();
				int numberClassRoomOfTeacher = numberClassRoomOfSubject / numberTeacherOfSubject;
				int remainder = numberClassRoomOfSubject % numberTeacherOfSubject;
				int teacherId = selectTeacher(TeacherClassCountMap,teacherIdList,numberClassRoomOfTeacher,remainder);
				//Số tiết đã phân bổ
				int allocatedLessons = 0;

				if (numberOfLessons >= 2) {
					//trong khi số tiết học > 2
					while (allocatedLessons < numberOfLessons && !availableLessons.isEmpty()) {
						//Kiểm tra điều kiện thứ 2 tiết 1, thứ 7 tiết 5
						LessonPair lessonPair = filterLessonAndTeacher(daysOfWeek, availableLessons, assignedLessons, classEntity, teacherId);
						Lesson startLesson = lessonPair.getLesson();
						DayOfWeek dayOfWeek = lessonPair.getDayOfWeek();
						int finalTeacherId = lessonPair.getTeacherId();

						//Kiểm tra nếu số tiết còn lại >= 2
						if (numberOfLessons - allocatedLessons >= 2) {
							//lesson tiếp theo của startLesson
							Lesson nextLesson = getNextLesson(availableLessons, startLesson.getLesson() + 1);

							//Nếu tiết kế tiếp hợp lệ thêm cả hai tiết vào danh sách
							if (nextLesson != null) {
								boolean isNextLessonValid = !((nextLesson.getLesson() == 5 && dayOfWeek == DayOfWeek.SATURDAY) ||
										(nextLesson.getLesson() == 1 && dayOfWeek == DayOfWeek.MONDAY)) &&
										assignedLessons.stream().noneMatch(al -> al.getLesson().equals(nextLesson)
												&& al.getDayOfWeek().equals(dayOfWeek) && al.getClassRoomId() == classEntity.getId())
										&& isTeacherAvailableForLesson(finalTeacherId, nextLesson, dayOfWeek, assignedLessons);
								if(isNextLessonValid){
									assignedLessons.add(new AssignedLesson(startLesson, finalTeacherId, subject.getId(), classEntity.getId(), dayOfWeek));
									assignedLessons.add(new AssignedLesson(nextLesson, finalTeacherId,subject.getId(),classEntity.getId(), dayOfWeek));
									allocatedLessons += 2;
								}else{
									assignedLessons.add(new AssignedLesson(startLesson, finalTeacherId,subject.getId(),classEntity.getId(), dayOfWeek));
									allocatedLessons++;
								}
							}
							else {
								assignedLessons.add(new AssignedLesson(startLesson, finalTeacherId, subject.getId(), classEntity.getId(), dayOfWeek));
								allocatedLessons++;
							}

						} else {
							//Nếu tiết còn lại < 2, thêm ngẫu nhiên
							assignedLessons.add(new AssignedLesson(startLesson, finalTeacherId,subject.getId(), classEntity.getId(), dayOfWeek));
							allocatedLessons++;
						}
					}
				} else {
					//tiết học < 2
					LessonPair lessonPair = filterLessonAndTeacher(daysOfWeek, availableLessons, assignedLessons, classEntity, teacherId);
					Lesson lesson = lessonPair.getLesson();
					DayOfWeek dayOfWeek = lessonPair.getDayOfWeek();
					int finalTeacherId = lessonPair.getTeacherId();
					assignedLessons.add(new AssignedLesson(lesson, finalTeacherId,subject.getId(), classEntity.getId(), dayOfWeek));
				}
			}
		}
		System.out.println(TeacherClassCountMap);
		List<TeachDetailsResponse> teachDetailsResponseList = assignedLessons.stream()
				.map(entry -> createTeachResponse(entry, schoolYearId, assignedLessons.indexOf(entry)))
				.collect(Collectors.toList());

		return TeachResponse.builder()
				.schoolYearResponse(schoolYearSemesterClient.getSchoolYearBySchoolYearId(schoolYearId).getResult())
				.teachDetails(teachDetailsResponseList)
				.build();
	}
	private Integer selectTeacher(Map<Integer, Integer> TeacherClassCountMap, List<TeacherSubjectResponse> teacherIdList,
								  int numberClassRoomOfTeacher, int remainder){
		do{
			int teacherId = teacherIdList.get(new Random().nextInt(teacherIdList.size())).getTeacherId();

			int currentClassCount = TeacherClassCountMap.getOrDefault(teacherId,0);

			int maxClassForTeacher = numberClassRoomOfTeacher + (remainder > 0 ? 1 : 0);

			if (currentClassCount >= maxClassForTeacher) {
				continue;
			}
			TeacherClassCountMap.put(teacherId,currentClassCount + 1);

			if (currentClassCount >= numberClassRoomOfTeacher) {
				remainder--;
			}
			return teacherId;
		}while (true);
	}

	private Lesson getNextLesson(List<Lesson> availableLessons, int nextLessonNumber) {
		return availableLessons.stream()
				.filter(l -> l.getLesson() == nextLessonNumber)
				.findFirst().orElse(null);
	}

	private LessonPair filterLessonAndTeacher(
			List<DayOfWeek> daysOfWeek, List<Lesson> availableLessons, List<AssignedLesson> assignedLessons, ClassEntityResponse classEntity, int teacherId) {
		Lesson startLesson;
		DayOfWeek dOfW;
		boolean isValid = false;
		long maxTimeInMillis = 3000;
		long startTime = System.currentTimeMillis();
		do {
			startLesson = availableLessons.get(new Random().nextInt(availableLessons.size()));
			dOfW = daysOfWeek.get(new Random().nextInt(daysOfWeek.size()));

			boolean isInvalidLesson = (startLesson.getLesson() == 5 && dOfW == DayOfWeek.SATURDAY) ||
					(startLesson.getLesson() == 1 && dOfW == DayOfWeek.MONDAY);

			Lesson finalStartLesson = startLesson;
			DayOfWeek finalDOfW = dOfW;
			boolean isLessonAlreadyAssigned = assignedLessons.stream().anyMatch(al ->
					al.getLesson().equals(finalStartLesson) &&
							al.getDayOfWeek().equals(finalDOfW) &&
							al.getClassRoomId() == classEntity.getId()
			);
			boolean isValidLesson = !isInvalidLesson && !isLessonAlreadyAssigned;
			boolean isValidTeacher = isTeacherAvailableForLesson(teacherId, startLesson, dOfW, assignedLessons);

			isValid = isValidLesson && isValidTeacher;

			if (System.currentTimeMillis() - startTime > maxTimeInMillis) {
				break;
			}
		} while (!isValid);
		return new LessonPair(startLesson, dOfW, teacherId);
	}

//	private LessonPair getValidLessonPair(List<DayOfWeek> daysOfWeek,
//										  List<Lesson> availableLessons,
//										  List<AssignedLesson> assignedLessons,
//										  ClassEntityResponse classEntity, int teacherId,
//										  List<TeacherSubjectResponse> teacherIdList) {
//		Lesson startLesson;
//		DayOfWeek dOfW;
//		int teacherIdNew = teacherId;
//		boolean isValid = false;
//		do {
//			startLesson = availableLessons.get(new Random().nextInt(availableLessons.size()));
//			dOfW = daysOfWeek.get(new Random().nextInt(daysOfWeek.size()));
//
//			boolean isInvalidLesson = (startLesson.getLesson() == 5 && dOfW == DayOfWeek.SATURDAY) ||
//					(startLesson.getLesson() == 1 && dOfW == DayOfWeek.MONDAY);
//
//			Lesson finalStartLesson = startLesson;
//			DayOfWeek finalDOfW = dOfW;
//			boolean isLessonAlreadyAssigned = assignedLessons.stream().anyMatch(al ->
//					al.getLesson().equals(finalStartLesson) &&
//							al.getDayOfWeek().equals(finalDOfW) &&
//							al.getClassRoomId() == classEntity.getId()
//			);
//
//			boolean isValidLesson = !isInvalidLesson && !isLessonAlreadyAssigned;
//			boolean isValidTeacher = isTeacherAvailableForLesson(teacherIdNew, startLesson, dOfW, assignedLessons);
//
//			if (!isValidTeacher) {
//				Lesson finalStartLesson1 = startLesson;
//				DayOfWeek finalDOfW1 = dOfW;
//				int finalTeacherIdNew = teacherIdNew;
//				List<TeacherSubjectResponse> filterTeacher = teacherIdList.stream()
//						.filter(t -> t.getTeacherId() != finalTeacherIdNew)
//						.filter(t -> isTeacherAvailableForLesson(t.getTeacherId(), finalStartLesson1, finalDOfW1, assignedLessons))
//						.toList();
//
//				if (!CollectionUtils.isEmpty(filterTeacher)) {
//					teacherIdNew = filterTeacher.get(new Random().nextInt(filterTeacher.size())).getTeacherId();
//					isValidTeacher = isTeacherAvailableForLesson(teacherIdNew, startLesson, dOfW, assignedLessons);
//				} else {
//					continue;
//				}
//			}
//			isValid = isValidLesson && isValidTeacher;
//
//		} while (!isValid);
//
//		return new LessonPair(startLesson, dOfW, teacherIdNew);
//	}


	boolean isTeacherAvailableForLesson(int teacherId, Lesson lesson, DayOfWeek dayOfWeek, List<AssignedLesson> assignedLessons) {
		return assignedLessons.stream().noneMatch(al ->
				al.getTeacherId() == teacherId &&
						al.getLesson().equals(lesson) &&
						al.getDayOfWeek().equals(dayOfWeek)
		);
	}
	private TeachDetailsResponse createTeachResponse(AssignedLesson entry, int schoolYearId, int index) {
		Teach teach = Teach.builder()
				.id(index + 1)
				.dayOfWeek(entry.getDayOfWeek())
				.teacherId(entry.getTeacherId())
				.subjectId(entry.getSubjectId())
				.classRoomId(entry.getClassRoomId())
				.schoolYearId(schoolYearId)
				.lesson(entry.getLesson())
				.build();

		return mapToTeachDetailsResponse(teach);
	}
	public TeachResponse getSchedulesBySchoolYearId(int schoolYearId) {
		List<Teach> teachList = teachRepository.findBySchoolYearId(schoolYearId);

		List<TeachDetailsResponse> teachDetailsResponseList =
				teachList.stream()
						.map(this::mapToTeachDetailsResponse)
						.sorted(Comparator.comparing(TeachDetailsResponse::getClassEntityResponse,
								Comparator.comparing(ClassEntityResponse::getName)))
						.toList();

		return TeachResponse.builder().schoolYearResponse(
				schoolYearSemesterClient.getSchoolYearBySchoolYearId(schoolYearId).getResult())
				.teachDetails(teachDetailsResponseList).build();
	}

	private TeachDetailsResponse mapToTeachDetailsResponse(Teach teach) {
		TeachDetailsResponse response = teachMapper.toTeachDetailsResponse(teach);
		response.setLesson(lessonMapper.toLessonResponse(teach.getLesson()));
		try{
			response.setTeacherResponse(teacherClient.getTeacherById(teach.getTeacherId()).getResult());
		}catch (Exception e){
			response.setTeacherResponse(null);
		}
		response.setSubjectResponse(subjectClient.getById(teach.getSubjectId()).getResult());
		response.setClassEntityResponse(classRoomClient.getById(teach.getClassRoomId()).getResult());
		return response;
	}


	public List<TeachDetailsResponse> saveSchedules(List<DataSaveSchedulesRequest> request) {
		List<TeachDetailsResponse> teachResponseList = new ArrayList<>();
		for (DataSaveSchedulesRequest entry : request) {
			Teach teach = Teach.builder()
					.dayOfWeek(DayOfWeek.valueOf(entry.getDayOfWeek()))
					.teacherId(entry.getTeacherId())
					.subjectId(entry.getSubjectId())
					.classRoomId(entry.getClassRoomId())
					.schoolYearId(entry.getSchoolYearId())
					.lesson(lessonRepository.findById(entry.getLessonId()).orElse(null))
					.build();

			teachResponseList.add(teachMapper.toTeachDetailsResponse(teach));
			teachRepository.save(teach);
		}
		return teachResponseList;
	}



	public List<TeachDetailsResponse> EditSchedules(DataEditRequest request) {
		Teach teach = teachRepository.findById(request.getTeachId())
				.orElseThrow(() ->  new AppException(ErrorCode.TEACH_NOT_EXISTED));
		List<Teach> teachList = teachRepository.findBySubjectIdAndClassRoomId(
				teach.getSubjectId(),teach.getClassRoomId());
		teachList.forEach(t -> t.setTeacherId(request.getTeacherId()));
		return teachRepository.saveAll(teachList).stream().map(this::mapToTeachDetailsResponse).toList();
	}

	public void deleteSchedulesBySchoolYearId(int schoolYearId) {
		List<Teach> teachList = teachRepository.findBySchoolYearId(schoolYearId);
		if(!CollectionUtils.isEmpty(teachList)){
			teachRepository.deleteAll(teachList);
		}
	}


    public List<TeachDetailsResponse> getSchedulesOfTeacherBySchoolYearId(int teacherId, int schoolYearId) {

		List<Teach> teachList = teachRepository.findByTeacherIdAndSchoolYearId(teacherId,schoolYearId);

		return teachList.stream().map(teach -> {
			TeachDetailsResponse response = teachMapper.toTeachDetailsResponse(teach);
			response.setLesson(lessonMapper.toLessonResponse(teach.getLesson()));
			response.setSubjectResponse(subjectClient.getById(teach.getSubjectId()).getResult());
			response.setClassEntityResponse(classRoomClient.getById(teach.getClassRoomId()).getResult());
//			response.setSchoolYearResponse(schoolYearSemesterClient.getSchoolYearBySchoolYearId(teach.getSchoolYearId()).getResult());
			return response;
		}).toList();
    }

	public List<ClassRoomIdOfTeacherResponse> getClassRoomIdsOfTeacher(
			int teacherId, int schoolYearId) {
		List<Integer> classRoomIdsOfTeacher = teachRepository.findClassRoomIdsByTeacherId(teacherId,schoolYearId);

		return classRoomIdsOfTeacher.stream().map(teachMapper::toClassRoomIdOfTeacherResponse).toList();
	}

	public List<SubjectResponse> getSubjectByTeacherAndClassRoom(int teacherId, int classRoomId) {
		List<Teach> teachList =
				teachRepository.findByTeacherIdAndClassRoomId(teacherId,classRoomId);

		return teachList.stream()
				.map(teach -> subjectClient.getById(teach.getSubjectId()).getResult())
				.distinct()
				.toList();
	}


}
