package com.schedule_service.service;

import com.schedule_service.Mapper.LessonMapper;
import com.schedule_service.dto.response.LessonResponse;
import com.schedule_service.models.Lesson;
import com.schedule_service.repository.LessonRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class LessonService {
    LessonRepository lessonRepository;
    LessonMapper lessonMapper;
    public List<LessonResponse> getAll() {
        List<Lesson> lessonList = lessonRepository.findAll();
        return lessonList.stream().map(lessonMapper::toLessonResponse).toList();
    }
}
