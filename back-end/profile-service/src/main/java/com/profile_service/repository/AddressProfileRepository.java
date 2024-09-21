package com.profile_service.repository;

import com.profile_service.models.AddressProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressProfileRepository extends JpaRepository<AddressProfile,Integer> {
    AddressProfile findByHouseNumberAndStreetAndWardAndDistrictAndCity(int houseNumber,String street, String ward,
                                          String district, String city);
}
