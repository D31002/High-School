package com.Relationship_Management_Service.mapper;

import com.Relationship_Management_Service.dto.response.ArrClassRoomResponse;
import com.Relationship_Management_Service.dto.response.StudentClassRoomResponse;
import com.Relationship_Management_Service.models.StudentClassRoom;

import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface StudentClassRoomMapper {
    StudentClassRoomResponse toStudentClassRoomResponse(StudentClassRoom studentClassRoom);
    ArrClassRoomResponse toArrClassRoomResponse(StudentClassRoom studentClassRoom);
}
