package com.profile_service.service;

import com.profile_service.Exception.AppException;
import com.profile_service.Exception.ErrorCode;
import com.profile_service.dto.request.AddressCreationRequest;
import com.profile_service.dto.request.ParentCreationRequest;
import com.profile_service.dto.request.UserCreationRequest;
import com.profile_service.dto.request.UserProfileCreationRequest;
import com.profile_service.dto.response.StudentResponse;
import com.profile_service.dto.response.TeacherResponse;
import com.profile_service.dto.response.UserProfileResponse;
import com.profile_service.dto.response.UserResponse;
import com.profile_service.mapper.AddressMapper;
import com.profile_service.mapper.UserProfileMapper;
import com.profile_service.models.AddressProfile;
import com.profile_service.models.UserProfile;
import com.profile_service.models.UserType;
import com.profile_service.repository.AddressProfileRepository;
import com.profile_service.repository.HttpClient.IdentityClient;
import com.profile_service.repository.HttpClient.ParentClient;
import com.profile_service.repository.HttpClient.StudentClient;
import com.profile_service.repository.HttpClient.TeacherClient;
import com.profile_service.repository.UserProfileRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserProfileService {

    UserProfileRepository userProfileRepository;
    UserProfileMapper userProfileMapper;
    AddressProfileRepository addressProfileRepository;
    AddressMapper addressMapper;
    IdentityClient identityClient;
    TeacherClient teacherClient;
    StudentClient studentClient;
    ParentClient parentClient;
    FileUpload fileUpload;

    public UserProfileResponse getProfileById(Integer id) {
        UserProfile userProfile = userProfileRepository.findById(id).orElseThrow(
                () -> new AppException(ErrorCode.PROFILE_NOT_EXISTED));
        UserResponse userResponse = null;
        if(userProfile.getUserId() != null){
            userResponse = identityClient.getUserById(userProfile.getUserId()).getResult(); 
        }
        UserProfileResponse userProfileResponse =userProfileMapper.toUserProfileResponse(userProfile);
        userProfileResponse.setUserResponse(userResponse);
        return userProfileResponse;
    }

    public List<UserProfileResponse> searchUserProfilesByFullName(String keyword) {
        List<UserProfile> userProfiles = userProfileRepository.findByFullNameContainingIgnoreCase(keyword);
        return userProfiles.stream()
                .map(userProfileMapper::toUserProfileResponse)
                .collect(Collectors.toList());
    }

    public UserProfileResponse createProfile(UserProfileCreationRequest request) {

        UserCreationRequest userCreationRequest =
                userProfileMapper.toUserCreationRequest(request);
        UserResponse userResponse = null;
        if(userCreationRequest.getUsername() != null && userCreationRequest.getPassword()!=null){
            userResponse= identityClient.createUser(userCreationRequest).getResult();
        }

        AddressCreationRequest addressCreationRequest = addressMapper.toAddressCreationRequest(request);
        AddressProfile existingAddress = addressProfileRepository.findByHouseNumberAndStreetAndWardAndDistrictAndCity(
                addressCreationRequest.getHouseNumber(),
                addressCreationRequest.getStreet(), addressCreationRequest.getWard(),
                addressCreationRequest.getDistrict(), addressCreationRequest.getCity());

        AddressProfile addressProfile;
        if (existingAddress != null) {
            addressProfile = existingAddress;
        } else {
            addressProfile = addressMapper.toAddressProfile(addressCreationRequest);
            addressProfileRepository.save(addressProfile);
        }

        UserProfile userProfile = userProfileMapper.toUserProfile(request);
        if (userResponse != null && userResponse.getId() > 0) {
            userProfile.setUserId(userResponse.getId());
        }else{
            userProfile.setUserId(null);
        }

        userProfile.setAddress(addressProfile);

        userProfileRepository.save(userProfile);

        return userProfileMapper.toUserProfileResponse(userProfile);
    }

    private int getUserIdFromToken(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return Integer.parseInt(authentication.getName());
    }

    public UserType getUserTypeFromToken() {
        int userId = getUserIdFromToken();
        UserProfile userProfile = userProfileRepository.findByUserId(userId);

        if (userProfile == null) {
            throw new AppException(ErrorCode.PROFILE_NOT_EXISTED);
        }
        return userProfile.getUserType();
    }

    public TeacherResponse getTeacherInfo() {
        int userId = getUserIdFromToken();

        UserProfile userProfile = userProfileRepository.findByUserId(userId);
        if (userProfile == null) {
            throw new AppException(ErrorCode.PROFILE_NOT_EXISTED);
        }

        return teacherClient.getTeacherByProfileId(userProfile.getId()).getResult();
    }

    public StudentResponse getStudentInfo() {
        int userId =getUserIdFromToken();

        UserProfile userProfile = userProfileRepository.findByUserId(userId);
        if (userProfile == null) {
            throw new AppException(ErrorCode.PROFILE_NOT_EXISTED);
        }

        return studentClient.getStudentByProfileId(userProfile.getId()).getResult();
    }


    public UserProfileResponse editProfile(int profileId, UserProfileCreationRequest request) {

        UserProfile userProfile = userProfileRepository.findById(profileId)
                .orElseThrow(() -> new AppException(ErrorCode.PROFILE_NOT_EXISTED));

        if(request.getUserType() == null){
            request.setUserType(userProfile.getUserType());
        }
        userProfileMapper.updateUserProfileFromRequest(userProfile,request);
        UserResponse userResponse;
        try{
            UserCreationRequest userCreationRequest = userProfileMapper.toUserCreationRequest(request);
            userResponse = identityClient.editUser(userProfile.getUserId(),userCreationRequest).getResult();
        }catch (Exception e){
            userResponse = null;
        }
        UserProfile updatedUserProfile = userProfileRepository.save(userProfile);

        UserProfileResponse userProfileResponse = userProfileMapper.toUserProfileResponse(updatedUserProfile);
        userProfileResponse.setUserResponse(userResponse);

        return userProfileResponse;
    }

    public void deleteProfile(int profileId) {
        UserProfile userProfile = userProfileRepository.findById(profileId)
                .orElseThrow(() ->new AppException(ErrorCode.PROFILE_NOT_EXISTED));
        identityClient.deleteUser(userProfile.getUserId());
        userProfileRepository.delete(userProfile);
        addressProfileRepository.deleteById(userProfile.getAddress().getId());
    }


    public UserProfileResponse updateProfileByMyInfo(
            MultipartFile fileRequest,
            UserProfileCreationRequest request) throws IOException {

        int userId = getUserIdFromToken();
        UserProfile userProfile = userProfileRepository.findByUserId(userId);

        if (fileRequest != null && !fileRequest.isEmpty()) {
            String urlImage = fileUpload.uploadFile(fileRequest);
            request.setImageUrl(urlImage);
        }else{
            request.setImageUrl(userProfile.getImageUrl());
        }

        request.setUserType(userProfile.getUserType());
        userProfileMapper.updateUserProfileFromRequest(userProfile,request);

        userProfileRepository.save(userProfile);

        AddressProfile addressProfile = userProfile.getAddress();
        addressMapper.updateAddressProfileFromRequest(addressProfile,request);
        addressProfileRepository.save(addressProfile);
        if(userProfile.getUserType() == UserType.student){
            StudentResponse studentResponse = studentClient.getStudentByProfileId(userProfile.getId()).getResult();
            ParentCreationRequest parentCreationRequest = request.getParent();
            parentCreationRequest.setHouseNumber(request.getHouseNumber());
            parentCreationRequest.setStreet(request.getStreet());
            parentCreationRequest.setWard(request.getWard());
            parentCreationRequest.setDistrict(request.getDistrict());
            parentCreationRequest.setCity(request.getCity());
            parentClient.createParent(studentResponse.getId(),parentCreationRequest);
        }

        return userProfileMapper.toUserProfileResponse(userProfile);
    }
}
