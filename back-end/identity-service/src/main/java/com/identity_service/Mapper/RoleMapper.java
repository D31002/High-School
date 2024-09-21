package com.identity_service.Mapper;

import com.identity_service.dto.response.RoleResponse;
import com.identity_service.models.Role;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RoleMapper {
    RoleResponse toRoleResponse(Role role);
}
