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


	public List<TeachResponse> generateSchedules(int schoolYearId) {

		// Lấy danh sách lớp học
		List<ClassEntityResponse> classRoomList =
				classRoomClient.getAllBySchoolYearNotPagination(schoolYearId)
						.getResult();

		classRoomList.sort(Comparator.comparing(ClassEntityResponse::getName));

		if(CollectionUtils.isEmpty(classRoomList)){
			throw new AppException(ErrorCode.CLASS_NOT_EXISTED);
		}

		// Lấy danh sách tiết học
		List<Lesson> lessons = lessonRepository.findAll();

		// Xác định các ngày trong tuần, loại bỏ chủ nhật
		List<DayOfWeek> daysOfWeek = Arrays.stream(DayOfWeek.values())
				.filter(day -> day != DayOfWeek.SUNDAY)
				.toList();

		List<TeachResponse> teachResponses = new ArrayList<>();

		List<AssignedLesson> assignedLessons = new ArrayList<>();
		// Duyệt từng lớp học
		for (ClassEntityResponse classEntity : classRoomList) {
			// Lấy danh sách môn học của lớp
			Set<SubjectResponse> subjects = classEntity.getCombination().getSubjects();

			for (SubjectResponse subject : subjects) {
				List<TeacherSubjectResponse> teacherIdList = teacherSubjectClient.getTeacherIdBySubjectId(subject.getId()).getResult();
				if (teacherIdList.isEmpty()) {
					throw new AppException(ErrorCode.NO_TEACHER_FOUND);
				}
				// Lấy số tiết học tối đa trong tuần cho môn học
				int numberOfLessons = subject.getNumberOfLessons();

				// Lọc các tiết học có sẵn
				List<Lesson> availableLessons = new ArrayList<>(lessons);

				// Chọn ngẫu nhiên giáo viên
				int teacherId = teacherIdList.get(new Random().nextInt(teacherIdList.size())).getTeacherId();

				// Số tiết đã phân bổ
				int allocatedLessons = 0;

				if (numberOfLessons >= 2) {
					// Xử lý cho trường hợp số tiết học > 2
					while (allocatedLessons < numberOfLessons && !availableLessons.isEmpty()) {
						//Kiểm tra điều kiện thứ 2 tiết 1, thứ 7 tiết 5
						LessonPair lessonPair = getValidLessonPair(daysOfWeek, availableLessons, assignedLessons, classEntity, teacherId, teacherIdList);
						Lesson startLesson = lessonPair.getLesson();
						DayOfWeek dayOfWeek = lessonPair.getDayOfWeek();
						int finalTeacherId = lessonPair.getTeacherId();

						// Kiểm tra nếu số tiết còn lại >= 2
						if (numberOfLessons - allocatedLessons >= 2) {
							//lesson tiếp theo của startLesson
							Lesson nextLesson = getNextLesson(availableLessons, startLesson.getLesson() + 1);

							// Nếu tiết kế tiếp hợp lệ, thêm cả hai tiết vào danh sách
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
							// Nếu số tiết còn lại < 2, chỉ cần thêm tiết ngẫu nhiên
							assignedLessons.add(new AssignedLesson(startLesson, finalTeacherId,subject.getId(), classEntity.getId(), dayOfWeek));
							allocatedLessons++;
						}
					}
				} else {
					// Xử lý cho trường hợp số tiết học < 2
					LessonPair lessonPair = getValidLessonPair(daysOfWeek, availableLessons, assignedLessons, classEntity, teacherId, teacherIdList);
					Lesson lesson = lessonPair.getLesson();
					DayOfWeek dayOfWeek = lessonPair.getDayOfWeek();
					int finalTeacherId = lessonPair.getTeacherId();
					assignedLessons.add(new AssignedLesson(lesson, finalTeacherId,subject.getId(), classEntity.getId(), dayOfWeek));
				}
			}
		}


		for (int i = 0; i < assignedLessons.size(); i++) {
			AssignedLesson entry = assignedLessons.get(i);
			teachResponses.add(createTeachResponse(entry, schoolYearId, i));
		}
		return teachResponses;
	}

	private Lesson getNextLesson(List<Lesson> availableLessons, int nextLessonNumber) {
		return availableLessons.stream()
				.filter(l -> l.getLesson() == nextLessonNumber)
				.findFirst().orElse(null);
	}

	private LessonPair getValidLessonPair(List<DayOfWeek> daysOfWeek,
										  List<Lesson> availableLessons,
										  List<AssignedLesson> assignedLessons,
										  ClassEntityResponse classEntity, int teacherId,
										  List<TeacherSubjectResponse> teacherIdList) {
		Lesson startLesson;
		DayOfWeek dOfW;
		int teacherIdNew = teacherId;
		boolean isValid = false;
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
			boolean isValidTeacher = isTeacherAvailableForLesson(teacherIdNew, startLesson, dOfW, assignedLessons);

			if (!isValidTeacher) {
				Lesson finalStartLesson1 = startLesson;
				DayOfWeek finalDOfW1 = dOfW;
				int finalTeacherIdNew = teacherIdNew;
				List<TeacherSubjectResponse> filterTeacher = teacherIdList.stream()
						.filter(t -> t.getTeacherId() != finalTeacherIdNew)
						.filter(t -> isTeacherAvailableForLesson(t.getTeacherId(), finalStartLesson1, finalDOfW1, assignedLessons))
						.toList();

				if (!CollectionUtils.isEmpty(filterTeacher)) {
					teacherIdNew = filterTeacher.get(new Random().nextInt(filterTeacher.size())).getTeacherId();
					isValidTeacher = isTeacherAvailableForLesson(teacherIdNew, startLesson, dOfW, assignedLessons);
				} else {
					continue;
				}
			}
			isValid = isValidLesson && isValidTeacher;

		} while (!isValid);

		return new LessonPair(startLesson, dOfW, teacherIdNew);
	}


	boolean isTeacherAvailableForLesson(int teacherId, Lesson lesson, DayOfWeek dayOfWeek, List<AssignedLesson> assignedLessons) {
		return assignedLessons.stream().noneMatch(al ->
				al.getTeacherId() == teacherId &&
						al.getLesson().equals(lesson) &&
						al.getDayOfWeek().equals(dayOfWeek)
		);
	}
	private TeachResponse createTeachResponse(AssignedLesson entry, int schoolYearId, int index) {
		Teach teach = Teach.builder()
				.id(index + 1)
				.dayOfWeek(entry.getDayOfWeek())
				.teacherId(entry.getTeacherId())
				.subjectId(entry.getSubjectId())
				.classRoomId(entry.getClassRoomId())
				.schoolYearId(schoolYearId)
				.lesson(entry.getLesson())
				.build();

		return mapToTeachResponse(teach);
	}
	public List<TeachResponse> getSchedulesBySchoolYearId(int schoolYearId) {
		List<Teach> teachList = teachRepository.findBySchoolYearId(schoolYearId);
		return teachList.stream()
				.map(this::mapToTeachResponse)
				.sorted(Comparator.comparing(TeachResponse::getClassEntityResponse,
						Comparator.comparing(ClassEntityResponse::getName)))
				.collect(Collectors.toList());
	}

	private TeachResponse mapToTeachResponse(Teach teach) {
		TeachResponse response = teachMapper.toTeachResponse(teach);
		response.setLesson(lessonMapper.toLessonResponse(teach.getLesson()));
		try{
			response.setTeacherResponse(teacherClient.getTeacherById(teach.getTeacherId()).getResult());
		}catch (Exception e){
			response.setTeacherResponse(null);
		}
		response.setSubjectResponse(subjectClient.getById(teach.getSubjectId()).getResult());
		response.setClassEntityResponse(classRoomClient.getById(teach.getClassRoomId()).getResult());
		response.setSchoolYearResponse(schoolYearSemesterClient.getSchoolYearBySchoolYearId(teach.getSchoolYearId()).getResult());
		return response;
	}


	public List<TeachResponse> saveSchedules(List<DataSaveSchedulesRequest> request) {
		List<TeachResponse> teachResponseList = new ArrayList<>();
		for (DataSaveSchedulesRequest entry : request) {
			Teach teach = Teach.builder()
					.dayOfWeek(DayOfWeek.valueOf(entry.getDayOfWeek()))
					.teacherId(entry.getTeacherId())
					.subjectId(entry.getSubjectId())
					.classRoomId(entry.getClassRoomId())
					.schoolYearId(entry.getSchoolYearId())
					.lesson(lessonRepository.findById(entry.getLessonId()).get())
					.build();

			teachResponseList.add(teachMapper.toTeachResponse(teach));
			teachRepository.save(teach);
		}
		return teachResponseList;
	}



	public TeachResponse EditSchedules(DataEditRequest request) {
		Teach teach = teachRepository.findById(request.getTeachId())
				.orElseThrow(() ->  new AppException(ErrorCode.TEACH_NOT_EXISTED));
		teach.setTeacherId(request.getTeacherId());
		return teachMapper.toTeachResponse(teachRepository.save(teach));
	}

	public void deleteSchedulesBySchoolYearId(int schoolYearId) {
		List<Teach> teachList = teachRepository.findBySchoolYearId(schoolYearId);
		if(!CollectionUtils.isEmpty(teachList)){
			teachRepository.deleteAll(teachList);
		}
	}


    public List<TeachResponse> getSchedulesOfTeacherBySchoolYearId(int teacherId, int schoolYearId) {

		List<Teach> teachList = teachRepository.findByTeacherIdAndSchoolYearId(teacherId,schoolYearId);

		return teachList.stream().map(teach -> {
			TeachResponse response = teachMapper.toTeachResponse(teach);
			response.setLesson(lessonMapper.toLessonResponse(teach.getLesson()));
			response.setSubjectResponse(subjectClient.getById(teach.getSubjectId()).getResult());
			response.setClassEntityResponse(classRoomClient.getById(teach.getClassRoomId()).getResult());
			response.setSchoolYearResponse(schoolYearSemesterClient.getSchoolYearBySchoolYearId(teach.getSchoolYearId()).getResult());
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
