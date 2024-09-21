package com.parent_service.service;

import com.parent_service.dto.request.ParentCreationRequest;
import com.parent_service.dto.request.UserProfileCreationRequest;
import com.parent_service.dto.response.ArrParentResponse;
import com.parent_service.dto.response.ParentResponse;
import com.parent_service.dto.response.UserProfileResponse;
import com.parent_service.exception.AppException;
import com.parent_service.exception.ErrorCode;
import com.parent_service.mapper.ParentMapper;
import com.parent_service.models.Parent;
import com.parent_service.models.UserType;
import com.parent_service.repository.HttpClient.ProfileClient;
import com.parent_service.repository.HttpClient.StudentParentClient;
import com.parent_service.repository.ParentRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class ParentService {

    ParentRepository parentRepository;
    ProfileClient profileClient;
    StudentParentClient studentParentClient;
    ParentMapper parentMapper;

    private void setAddressInfo(UserProfileCreationRequest profileCreationRequest, ParentCreationRequest request) {
        profileCreationRequest.setHouseNumber(request.getHouseNumber());
        profileCreationRequest.setStreet(request.getStreet());
        profileCreationRequest.setWard(request.getWard());
        profileCreationRequest.setDistrict(request.getDistrict());
        profileCreationRequest.setCity(request.getCity());
    }
    private UserProfileCreationRequest createUserProfileRequestForParent(String name, LocalDate birthday, String phoneNumber, int gender, ParentCreationRequest request) {
        UserProfileCreationRequest profileRequest = new UserProfileCreationRequest();
        profileRequest.setFullName(name);
        profileRequest.setBirthday(birthday);
        profileRequest.setPhoneNumber(phoneNumber);
        profileRequest.setUserType(UserType.parent);
        profileRequest.setGender(gender);
        setAddressInfo(profileRequest, request);

        return profileRequest;
    }

    public List<ParentResponse> createParent(int studentId, ParentCreationRequest request) {
        UserProfileCreationRequest userProfileRequestFather = createUserProfileRequestForParent(
                request.getFatherName(),
                request.getFatherBirthday(),
                request.getFatherPhoneNumber(),
                0,
                request
        );
        Parent father;
        if(request.getFatherId() != 0){

            father = parentRepository.findById(request.getFatherId())
                    .orElseThrow(() -> new AppException(ErrorCode.PARENT_NOT_EXISTED));
            UserProfileResponse userProfileResponseFather =
                    profileClient.editProfile(father.getProfileId(), userProfileRequestFather).getResult();
            father.setJob(request.getFatherJob());
            parentRepository.save(father);
        }else{
            UserProfileResponse userProfileResponseFather =
                    profileClient.createProfile(userProfileRequestFather).getResult();
            father = parentRepository.save(Parent.builder()
                    .job(request.getFatherJob())
                    .profileId(userProfileResponseFather.getId())
                    .build());

            studentParentClient.addStudentAndParent(studentId, father.getId());
        }

        UserProfileCreationRequest userProfileRequestMother = createUserProfileRequestForParent(
                request.getMotherName(),
                request.getMotherBirthday(),
                request.getMotherPhoneNumber(),
                1,
                request
        );
        Parent mother;
        if(request.getMotherId() != 0){
            mother = parentRepository.findById(request.getMotherId())
                    .orElseThrow(() -> new AppException(ErrorCode.PARENT_NOT_EXISTED));
            UserProfileResponse userProfileResponseMother =
                    profileClient.editProfile(mother.getProfileId(), userProfileRequestMother).getResult();
            mother.setJob(request.getMotherJob());
            parentRepository.save(mother);
        }else{
            UserProfileResponse userProfileResponseMother =
                    profileClient.createProfile(userProfileRequestMother).getResult();
            mother = parentRepository.save(Parent.builder()
                    .job(request.getMotherJob())
                    .profileId(userProfileResponseMother.getId())
                    .build());

            studentParentClient.addStudentAndParent(studentId, mother.getId());
        }


        List<ParentResponse> parentResponseList = new ArrayList<>();
        parentResponseList.add(parentMapper.toParentResponse(father));
        parentResponseList.add(parentMapper.toParentResponse(mother));

        return parentResponseList;
    }

    public List<ParentResponse> getAllParentOfStudent(int studentId) {
        List<ArrParentResponse> responses = studentParentClient.getParentOfStudent(studentId).getResult();
        if(!CollectionUtils.isEmpty(responses)){

            return responses.stream().map(parent -> {
                Parent p = parentRepository.findById(parent.getParentId())
                        .orElseThrow(() -> new AppException(ErrorCode.PARENT_NOT_EXISTED));
                ParentResponse parentResponse = parentMapper.toParentResponse(p);
                UserProfileResponse userProfileResponse = profileClient.getProfileById(p.getProfileId()).getResult();
                parentResponse.setUserProfileResponse(userProfileResponse);
                return parentResponse;
            }).toList();
        }
        return null;
    }
}
