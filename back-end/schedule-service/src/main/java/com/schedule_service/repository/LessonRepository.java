package com.schedule_service.repository;

import com.schedule_service.models.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LessonRepository extends JpaRepository<Lesson,Integer> {
}
