package com.teacher_service.Controller;

import com.teacher_service.dto.response.ApiResponse;
import com.teacher_service.dto.response.TeacherResponse;
import com.teacher_service.service.TeacherService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/internal")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class internalController {
    TeacherService teacherService;

    @GetMapping("/getTeacherByProfileId/{profileId}")
    ApiResponse<TeacherResponse> getTeacherByProfileId(@PathVariable int profileId){
        TeacherResponse result = teacherService.getTeacherByProfileId(profileId);
        return ApiResponse.<TeacherResponse>builder()
                .result(result)
                .build();
    }
}
