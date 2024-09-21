package com.classRoom_service.repository;

//import com.identity_service.models.SchoolYear;
import com.classRoom_service.Models.ClassEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface ClassEntityRepository extends JpaRepository<ClassEntity,Integer> {
    @Query(value = "SELECT c FROM ClassEntity c WHERE c.schoolYearId = ?1 AND LOWER(c.name) LIKE LOWER(CONCAT(?2, '%'))")
    Page<ClassEntity> findBySchoolYearIdAndKeyWord(Integer schoolYearId, String keyword, Pageable pageable);

	@Query(value = "SELECT COUNT(*) > 0 FROM ClassEntity c WHERE c.schoolYearId = ?1 AND c.name = ?2")
	boolean existsByNameOfSchoolYear(int schoolYearId, String name);

    @Query(value = "SELECT COUNT(*) > 0 FROM ClassEntity c WHERE c.classTeacherId = ?1 AND c.schoolYearId = ?2")
    boolean existsByClassTeacherAndSchoolYear(int teacherId, int schoolYearId);

    List<ClassEntity> findBySchoolYearId(int schoolYearId);

    @Query(value = "SELECT c FROM ClassEntity c WHERE c.schoolYearId = ?1 " +
            "AND (?2 IS NULL OR c.grade.id = ?2)" +
            "AND LOWER(c.name) LIKE LOWER(CONCAT(?3, '%'))")
    List<ClassEntity> findBySchoolYearIdAndGradeAndKeyWord(Integer schoolYearId, Integer gradeId, String keyword);

    @Query(value = "SELECT c FROM ClassEntity c WHERE c.id IN ?1 AND c.schoolYearId = ?2")
    ClassEntity findByClassRoomIdsAndSchoolYearId(List<Integer> classRoomIds, int schoolYearId);

    ClassEntity findByClassTeacherIdAndSchoolYearId(int classTeacherId, int schoolYearId);

    ClassEntity findByClassTeacherId(int classTeacherId);
}
