package com.student_service.mapper;

import com.student_service.dto.request.StudentCreationRequest;
import com.student_service.dto.request.StudentEditRequest;
import com.student_service.dto.request.UserProfileCreationRequest;
import com.student_service.dto.response.StudentResponse;
import com.student_service.models.Student;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface StudentMapper {
    StudentResponse toStudentResponse(Student teacher);

    UserProfileCreationRequest toUserProfileCreationRequest(StudentCreationRequest request);

    UserProfileCreationRequest toUserProfileCreationRequest(StudentEditRequest request);
}