package com.teacher_service.Mapper;

import com.teacher_service.Models.Teacher;
import com.teacher_service.dto.request.TeacherCreationRequest;
import com.teacher_service.dto.request.UserProfileCreationRequest;
import com.teacher_service.dto.response.TeacherResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TeacherMapper {
    TeacherResponse toteacherResponse(Teacher teacher);

    UserProfileCreationRequest toUserProfileCreationRequest(TeacherCreationRequest request);
}
