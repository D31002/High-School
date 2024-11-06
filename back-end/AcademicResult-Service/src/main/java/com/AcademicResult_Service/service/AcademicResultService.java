package com.AcademicResult_Service.service;

import com.AcademicResult_Service.Exception.AppException;
import com.AcademicResult_Service.Exception.ErrorCode;
import com.AcademicResult_Service.dto.request.AcademicCreationRequest;
import com.AcademicResult_Service.dto.request.AcademicPerformanceRequest;
import com.AcademicResult_Service.dto.request.AssessmentRequest;
import com.AcademicResult_Service.dto.response.*;
import com.AcademicResult_Service.mapper.AcademicPerformanceMapper;
import com.AcademicResult_Service.mapper.AcademicResultMapper;
import com.AcademicResult_Service.mapper.ConductMapper;
import com.AcademicResult_Service.models.*;
import com.AcademicResult_Service.repository.AcademicResultRepository;
import com.AcademicResult_Service.repository.CategoryRepository;
import com.AcademicResult_Service.repository.HttpClient.*;
import com.AcademicResult_Service.repository.ScoreRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.RequestParam;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class AcademicResultService {

    AcademicResultRepository academicResultRepository;
    CategoryRepository categoryRepository;
    ScoreRepository scoreRepository;
    StudentClient studentClient;
    ProfileClient profileClient;
    ScheduleClient scheduleClient;
    ClassRoomClient classRoomClient;
    AcademicPerformanceMapper academicPerformanceMapper;
    ConductMapper conductMapper;
    AcademicResultMapper academicResultMapper;


    public void createScoresOfStudent(int teacherId, List<AcademicCreationRequest> requests) {
        if(CollectionUtils.isEmpty(requests))
            throw new AppException(ErrorCode.NO_DATA);

        for(AcademicCreationRequest request : requests){
            AcademicResult academicResult =
                    academicResultRepository.findByStudentIdAndSemesterIdAndClassRoomId(
                            request.getStudentId(), request.getSemesterId(), request.getClassRoomId());
            if (academicResult == null) {
                academicResult = academicResultRepository.save(
                        AcademicResult.builder()
                                .studentId(request.getStudentId())
                                .semesterId(request.getSemesterId())
                                .classRoomId(request.getClassRoomId())
                                .build()
                );
            }
            AcademicResult finalAcademicResult = academicResult;

            request.getScoresRequests().forEach(scoresRequest -> {
                Category category = categoryRepository.findById(scoresRequest.getCategoryId())
                        .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_EXISTED));

                List<SubjectResponse> subjectOfTeacher =
                        scheduleClient.getSubjectByTeacherAndClassRoom(teacherId, request.getClassRoomId()).getResult();

                if (CollectionUtils.isEmpty(subjectOfTeacher) ||
                        subjectOfTeacher.stream()
                                .noneMatch(subjectResponse -> subjectResponse.getId() == scoresRequest.getSubjectId())) {
                    throw new AppException(ErrorCode.SUBJECT_NOT_ASSIGNED_TO_TEACHER);
                }

                if (scoresRequest.getScoreId() != null) {
                    Score score = scoreRepository.findById(scoresRequest.getScoreId())
                            .orElseThrow(() -> new AppException(ErrorCode.SCORE_NOT_EXISTED));
                    score.setScore(scoresRequest.getScore());
                    score.setUpdatedTime(new Date());
                    scoreRepository.save(score);
                } else {
                    scoreRepository.save(Score.builder()
                            .score(scoresRequest.getScore())
                            .createdTime(new Date())
                            .subjectId(scoresRequest.getSubjectId())
                            .academicResult(finalAcademicResult)
                            .category(category)
                            .build());
                }
            });
        };
    }

    private AcademicResultResponse mapToAcademicResultResponse(StudentResponse student,int semesterId,int subjectId,int classRoomId){
        AcademicResultResponse academicResultResponse = new AcademicResultResponse();
        academicResultResponse.setStudentId(student.getId());
        academicResultResponse.setStudentCode(student.getStudentCode());
        academicResultResponse.setFullName(student.getUserProfileResponse().getFullName());

        AcademicResult academicResult =
                    academicResultRepository.findByStudentIdAndSemesterIdAndClassRoomId(
                            student.getId(),semesterId,classRoomId);
        if(academicResult != null){
            academicResultResponse.setAcademicPerformance(
                    academicPerformanceMapper.toAcademicPerformanceResponse(academicResult.getAcademicPerformance())
            );
            academicResultResponse.setConduct(conductMapper.toConductResponse(academicResult.getConduct()));
            academicResultResponse.setMeanScore(academicResult.getMeanScore());
            academicResultResponse.setStudentRank(academicResult.getStudentRank());
            academicResultResponse.setId(academicResult.getId());
            List<Score> scoreList;
            if(subjectId != -1){
                scoreList = scoreRepository.findByAcademicResultAndSubjectId(academicResult,subjectId);
            }else {
                scoreList = scoreRepository.findByAcademicResult(academicResult);
            }
            if(scoreList != null && !scoreList.isEmpty()){
                Map<Category,List<Score>> scoresByCategory = scoreList.stream()
                        .collect(Collectors.groupingBy(Score::getCategory));
                List<ScoresResponse> scoresResponses = scoresByCategory.entrySet().stream()
                        .map(entry -> new ScoresResponse(
                                entry.getKey().getId(),
                                entry.getKey().getName(),
                                entry.getKey().getFactor(),
                                entry.getValue().stream()
                                        .map(score ->
                                                new ScoreItemResponse(
                                                        score.getId(),
                                                        score.getSubjectId(),
                                                        score.getScore())
                                        )
                                        .toList()
                        ))
                        .toList();
                academicResultResponse.setScoresResponses(scoresResponses);
            }

        }
        return academicResultResponse;
    }

    public List<AcademicResultResponse> getAll( Integer classRoomId, Integer semesterId) {
        return academicResultRepository.findByClassRoomIdAndSemesterId(classRoomId,semesterId)
                .stream().map(academicResultMapper::toAcademicResultResponse).toList();
    }

    public PageResponse<AcademicResultResponse> getAllAcademicOfStudentOfClassRoom(int classRoomId, int semesterId, int subjectId, int page, int pageSize, String keyword) {
        if(semesterId == -1){
            return new PageResponse<>();
        }
        PageResponse<StudentResponse> response =
                studentClient.getStudentENROLLEDByClassRoom(classRoomId,page,pageSize,keyword).getResult();

        List<StudentResponse> studentResponseList = response.getData();

        List<AcademicResultResponse> academicResultResponseList =
                studentResponseList.stream()
                        .map(student -> mapToAcademicResultResponse(student,semesterId,subjectId,classRoomId)
                ).toList();

        return PageResponse.<AcademicResultResponse>builder()
                .currentPage(response.getCurrentPage())
                .pageSize(response.getPageSize())
                .totalElements(response.getTotalElements())
                .totalPages(response.getTotalPages())
                .data(academicResultResponseList)
                .build();
    }

    public AcademicResultResponse getAcademicOfStudent(int studentId, int classRoomId, int semesterId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        boolean isStudent = authentication.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_STUDENT"));
        StudentResponse student;
        if (isStudent) {
            student = profileClient.getMyInFo().getResult();
        } else {
            student = studentClient.getStudentById(studentId).getResult();
        }
        return mapToAcademicResultResponse(student, semesterId, -1, classRoomId);
    }

    public SubjectMeanScoreResponse calculateMeanScoreSubject(
            int studentId, int classRoomId, int semesterId, int subjectId) {

        AcademicResultResponse academicResultResponse = getAcademicOfStudent(studentId, classRoomId, semesterId);

        if (subjectId == 10) {

            boolean allCategoriesHaveD = true;

            List<Category> categoryList = categoryRepository.findAll();
            Set<Integer> categoryIds = categoryList.stream()
                    .map(Category::getId)
                    .collect(Collectors.toSet());

            Set<Integer> categoryIdsWithScores = new HashSet<>();

            if (!CollectionUtils.isEmpty(categoryList)) {
                for (Category category : categoryList) {
                    ScoresResponse categoryItem = academicResultResponse.getScoresResponses().stream()
                            .filter(scoresResponse -> scoresResponse.getCategoryId() == category.getId())
                            .findFirst()
                            .orElse(null);

                    if (categoryItem != null) {
                        List<ScoreItemResponse> scoreItemResponseList =
                                categoryItem.getScores().stream().filter(scoreItemResponse -> scoreItemResponse.getSubjectId() == subjectId).toList();

                        if (!CollectionUtils.isEmpty(scoreItemResponseList)) {
                            categoryIdsWithScores.add(category.getId());
                            boolean hasNonD = scoreItemResponseList.stream()
                                    .anyMatch(scoreItemResponse -> !scoreItemResponse.getScore().equals("Đ"));

                            if (hasNonD) {
                                allCategoriesHaveD = false;
                                break;
                            }
                        } else {
                            allCategoriesHaveD = false;
                            break;
                        }
                    }
                }
            }
            boolean hasScoresForAllCat = categoryIds.equals(categoryIdsWithScores);
            return SubjectMeanScoreResponse.builder()
                    .subjectId(subjectId)
                    .meanScore(hasScoresForAllCat ? (allCategoriesHaveD ? "Đ" : "KĐ") : null)
                    .build();

        }


        AtomicInteger totalScore = new AtomicInteger(0);
        AtomicInteger totalFactor = new AtomicInteger(0);

        List<Category> categoryList = categoryRepository.findAll();

        Set<Integer> categoryIds = categoryList.stream()
                .map(Category::getId)
                .collect(Collectors.toSet());

        Set<Integer> categoryIdsWithScores = new HashSet<>();

        if(!CollectionUtils.isEmpty(categoryList)){
            categoryList.forEach(category -> {
                ScoresResponse categoryItem = academicResultResponse.getScoresResponses().stream()
                        .filter(scoresResponse -> scoresResponse.getCategoryId() == category.getId())
                        .findFirst()
                        .orElse(null);

                if(categoryItem != null){
                    int factor = categoryItem.getFactor();

                    List<ScoreItemResponse> scoreItemResponseList =
                            categoryItem.getScores().stream().filter(scoreItemResponse -> scoreItemResponse.getSubjectId() == subjectId).toList();

                    if(!CollectionUtils.isEmpty(scoreItemResponseList)){
                        categoryIdsWithScores.add(category.getId());
                        scoreItemResponseList.forEach(scoreItemResponse -> {
                            float score = Float.parseFloat(scoreItemResponse.getScore());
                            totalScore.addAndGet((int) (score * factor));
                            totalFactor.addAndGet(factor);
                        });
                    }
                }
            });
        }
        boolean hasScoresForAllCat = categoryIds.equals(categoryIdsWithScores);

        var meanScore = (hasScoresForAllCat && totalFactor.get() > 0 && totalScore.get() > 0)
                ? (float) totalScore.get() / totalFactor.get() : null;

        BigDecimal meanScoreDecimal = (meanScore != null)
                ? new BigDecimal(meanScore)
                : BigDecimal.ZERO;

        meanScoreDecimal = meanScoreDecimal.setScale(1, RoundingMode.HALF_UP);

        return SubjectMeanScoreResponse.builder()
                .subjectId(subjectId)
                .meanScore(meanScoreDecimal.floatValue() != 0 ? String.valueOf(meanScoreDecimal.floatValue()) : null)
                .build();
    }


    public MeanScoreSemesterResponse calculateMeanScoreSemester(
            int studentId, int classRoomId, int semesterId){

        ClassEntityResponse classRoom = classRoomClient.getById(classRoomId).getResult();

        List<SubjectMeanScoreResponse> listSubjectMeanScore = classRoom.getCombination().getSubjects().stream()
                .filter(subjectResponse -> subjectResponse.getId() != 10)
                .map(subjectResponse -> calculateMeanScoreSubject(studentId,classRoomId,semesterId,subjectResponse.getId())).toList();

        if(listSubjectMeanScore.stream().anyMatch(subjectMeanScoreResponse -> subjectMeanScoreResponse.getMeanScore() == null)){
            throw new AppException(ErrorCode.NOT_ENOUGH_SCORES_TO_CALCULATE);
        }

        float totalMean =(float) listSubjectMeanScore.stream()
                .filter(subjectMeanScoreResponse -> subjectMeanScoreResponse.getSubjectId() != 10)
                .map(SubjectMeanScoreResponse::getMeanScore)
                .mapToDouble(Double::parseDouble)
                .sum();

        int subjectSize = (int) listSubjectMeanScore.stream()
                .filter(subjectMeanScoreResponse -> subjectMeanScoreResponse.getSubjectId() != 10)
                .count();

        BigDecimal meanScoreSemester = new BigDecimal(totalMean / subjectSize).setScale(1,RoundingMode.HALF_UP);

        return MeanScoreSemesterResponse.builder().studentId(studentId).meanScore(String.valueOf(meanScoreSemester)).build();
    }

    public void assessment(List<AssessmentRequest> requests) {
        List<AcademicResult> academicResultList =
                requests.stream().map(request -> {
                    AcademicResult academicResult =
                            academicResultRepository.findById(request.getId())
                                    .orElseThrow((() -> new AppException(ErrorCode.ACADEMIC_RESULT_NOT_EXISTED) ));
                    academicResult.setStudentRank(request.getStudentRank());
                    academicResult.setMeanScore(request.getMeanScore());
                    try{
                        AcademicPerformance academicPerformance =
                                academicPerformanceMapper.toAcademicPerformance(request.getAcademicPerformance());
                        academicResult.setAcademicPerformance(academicPerformance);
                    }catch (Exception e){
                        throw new AppException(ErrorCode.ACADEMIC_PERFORMANCE_NOT_EXISTED);
                    }
                    try{
                        Conduct conduct =
                                conductMapper.toConduct(request.getConduct());
                        academicResult.setConduct(conduct);
                    }catch (Exception e){
                        throw new AppException(ErrorCode.CONDUCT_NOT_EXISTED);
                    }
                    return academicResult;
                }).toList();

        academicResultRepository.saveAll(academicResultList);
    }


    public List<AcademicResultResponse> getAcademicResultsOfClassRoomAboveAverage(int classRoomId) {
        List<AcademicResult> academicResultList =
                academicResultRepository.findByClassRoomAndAboveAverage(classRoomId);

        return academicResultList.stream()
                .map(academicResultMapper::toAcademicResultResponse).toList();
    }
}
