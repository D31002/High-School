package com.profile_service.mapper;

import com.profile_service.dto.request.AddressCreationRequest;
import com.profile_service.dto.request.UserProfileCreationRequest;
import com.profile_service.models.AddressProfile;
import com.profile_service.models.UserProfile;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface AddressMapper {
    AddressCreationRequest toAddressCreationRequest(UserProfileCreationRequest request);

    AddressProfile toAddressProfile(AddressCreationRequest addressCreationRequest);

    void updateAddressProfileFromRequest(@MappingTarget AddressProfile addressProfile, UserProfileCreationRequest request);
}
