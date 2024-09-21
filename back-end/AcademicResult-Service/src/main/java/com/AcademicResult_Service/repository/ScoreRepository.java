package com.AcademicResult_Service.repository;

import com.AcademicResult_Service.models.AcademicResult;
import com.AcademicResult_Service.models.Category;
import com.AcademicResult_Service.models.Score;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScoreRepository extends JpaRepository<Score,Integer> {
    List<Score> findByAcademicResultAndSubjectId(AcademicResult academicResult, int subjectId);

    Score findBySubjectIdAndCategoryAndAcademicResult(int subjectId, Category category, AcademicResult finalAcademicResult);

    List<Score> findByAcademicResult(AcademicResult academicResult);
}
