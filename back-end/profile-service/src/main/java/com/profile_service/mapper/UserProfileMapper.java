package com.profile_service.mapper;

import com.profile_service.dto.request.ParentCreationRequest;
import com.profile_service.dto.request.UserCreationRequest;
import com.profile_service.dto.request.UserProfileCreationRequest;
import com.profile_service.dto.response.UserProfileResponse;
import com.profile_service.models.UserProfile;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserProfileMapper {
    @Mapping(target = "address", ignore = true)
    UserProfile toUserProfile(UserProfileCreationRequest request);

    UserProfileResponse toUserProfileResponse(UserProfile userProfile);

    UserCreationRequest toUserCreationRequest(UserProfileCreationRequest request);

    ParentCreationRequest toParentCreationRequest(UserProfileCreationRequest request);

    void updateUserProfileFromRequest(@MappingTarget UserProfile userProfile, UserProfileCreationRequest request);
}
