package com.AcademicResult_Service.mapper;

import com.AcademicResult_Service.dto.request.ConductRequest;
import com.AcademicResult_Service.dto.response.ConductResponse;
import com.AcademicResult_Service.models.Conduct;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ConductMapper {
    ConductResponse toConductResponse(Conduct conduct);
    Conduct toConduct(ConductRequest conductRequest);
}
