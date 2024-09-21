package com.student_service.models;

import java.util.Arrays;
import java.util.List;

public enum Status {
    ENROLLED, //ĐANG_HỌC
    ON_LEAVE, //NGHỈ_HỌC
    GRADUATED; //ĐÃ_TỐT_NHIỆP


    public static List<Status> getAllStatuses() {
        return Arrays.asList(Status.values());
    }
}
