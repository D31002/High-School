package com.identity_service.models;

import lombok.Getter;

import java.util.Arrays;
import java.util.List;

@Getter
public enum Status {
    ENROLLED("Đang học"),
    ON_LEAVE("Nghỉ học"),
    GRADUATED("Đã tốt nghiệp");

    private final String vietnameseName;

    Status(String vietnamese){
        this.vietnameseName = vietnamese;
    }

    public static Status mapVietnameseStatusToEnum(String vietnameseStatus) {
        return switch (vietnameseStatus) {
            case "Đang học" -> Status.ENROLLED;
            case "Nghỉ học" -> Status.ON_LEAVE;
            case "Đã tốt nghiệp" -> Status.GRADUATED;
            default -> throw new IllegalArgumentException("Trạng thái không hợp lệ: " + vietnameseStatus);
        };
    }
}
