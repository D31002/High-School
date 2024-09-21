package com.schedule_service.controller;

import com.schedule_service.dto.response.ApiResponse;
import com.schedule_service.dto.response.ClassRoomIdOfTeacherResponse;
import com.schedule_service.service.TeachService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/internal")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class InternalController {
    TeachService teachService;

    @GetMapping("/teach/getClassRoomIdsOfTeacher")
    ApiResponse<List<ClassRoomIdOfTeacherResponse>> getClassRoomIdsOfTeacher(
            @RequestParam int teacherId,
            @RequestParam int schoolYearId){
        List<ClassRoomIdOfTeacherResponse> result =
                teachService.getClassRoomIdsOfTeacher(teacherId,schoolYearId);
        return ApiResponse.<List<ClassRoomIdOfTeacherResponse>>builder()
                .result(result)
                .build();
    }

}
