package com.identity_service.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import com.identity_service.Exception.AppException;
import com.identity_service.Exception.ErrorCode;
import com.identity_service.Mapper.UserMapper;
import com.identity_service.dto.request.UserCreationRequest;
import com.identity_service.models.Status;
import com.identity_service.models.UserType;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.identity_service.dto.response.UserResponse;

import com.identity_service.models.Role;
import com.identity_service.models.User;
import com.identity_service.repository.RoleRepository;
import com.identity_service.repository.UserRepository;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class UserService{

	UserRepository userRepository;
	RoleRepository roleRepository;
	UserMapper userMapper;
	PasswordEncoder passwordEncoder;

	public UserResponse getUserById(int id) {
		User user = userRepository.findById(id)
				.orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

		return userMapper.toUserResponse(user);
	}

	public UserResponse createUser(UserCreationRequest request) {
		User existingUser = userRepository.findByUsername(request.getUsername());
		if (existingUser != null) {
			throw new AppException(ErrorCode.USERNAME_EXISTED);
		}

		Set<Role> roles = new HashSet<>();
		if(request.getUserType() == UserType.student){
			Role roleStudent = roleRepository.findByName("STUDENT");
			roles.add(roleStudent);
		}else if(request.getUserType() == UserType.teacher){
			Role roleTeacher = roleRepository.findByName("TEACHER");
			roles.add(roleTeacher);
		}else if(request.getUserType() == UserType.parent){
			Role roleUser = roleRepository.findByName("USER");
			roles.add(roleUser);
		}

		return userMapper.toUserResponse(
				userRepository.save(User.builder()
								.username(request.getUsername())
								.password(passwordEncoder.encode(request.getPassword()))
								.roles(roles)
								.enable(true)
						.build()));
	}

	public UserResponse editUser(int userId, UserCreationRequest request) {
		User user = userRepository.findById(userId)
				.orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

		if (request.getPassword() != null && !request.getPassword().isEmpty()) {
			request.setPassword(passwordEncoder.encode(request.getPassword()));
		}else{
			request.setPassword(user.getPassword());
		}

        user.setEnable(request.getStatus() == null ||
                Status.mapVietnameseStatusToEnum(request.getStatus()) == Status.ENROLLED);

		userMapper.updateUserFromRequest(user,request);

		return userMapper.toUserResponse(userRepository.save(user));
	}

    public void deleteUser(int userId) {
		User user = userRepository.findById(userId)
				.orElseThrow(() ->new AppException(ErrorCode.USER_NOT_EXISTED));
		userRepository.delete(user);
    }

}
