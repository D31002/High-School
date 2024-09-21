package com.AcademicResult_Service.mapper;

import com.AcademicResult_Service.dto.request.AcademicPerformanceRequest;
import com.AcademicResult_Service.dto.response.AcademicPerformanceResponse;
import com.AcademicResult_Service.dto.response.ConductResponse;
import com.AcademicResult_Service.models.AcademicPerformance;
import com.AcademicResult_Service.models.Conduct;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AcademicPerformanceMapper {
    AcademicPerformanceResponse toAcademicPerformanceResponse(AcademicPerformance academicPerformance);
    AcademicPerformance toAcademicPerformance(AcademicPerformanceRequest academicPerformanceRequest);
}
