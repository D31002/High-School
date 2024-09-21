package com.schedule_service.controller;

import com.schedule_service.dto.response.ApiResponse;
import com.schedule_service.dto.response.LessonResponse;
import com.schedule_service.dto.response.TeachResponse;
import com.schedule_service.service.LessonService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/pl")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class LessonController {

    LessonService lessonService;

    @GetMapping("/lesson/getAll")
    ApiResponse<List<LessonResponse>> getAll(){
        List<LessonResponse> result = lessonService.getAll();
        return ApiResponse.<List<LessonResponse>>builder().result(result).build();
    }


}
