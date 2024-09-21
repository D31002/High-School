package com.identity_service.Mapper;

import com.identity_service.dto.request.UserCreationRequest;
import com.identity_service.dto.response.UserResponse;
import com.identity_service.models.User;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserResponse toUserResponse(User user);

    void updateUserFromRequest(@MappingTarget User user, UserCreationRequest request);
}
