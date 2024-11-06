package com.schedule_service.Exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "Lỗi chưa được phân loại", HttpStatus.INTERNAL_SERVER_ERROR),
    TOKEN_INVALID(1004, "Token không hợp lệ", HttpStatus.UNAUTHORIZED),
    UNAUTHENTICATED(1002, "Không được xác thực",HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1003,"không có quyền truy cập",HttpStatus.FORBIDDEN),

    //1700
    NO_TEACHER_FOUND(1700,"Môn học không có giáo viên giảng dạy",HttpStatus.BAD_REQUEST),
    CLASS_NOT_EXISTED(1701,"Năm học không có lớp học",HttpStatus.NOT_FOUND),
    TEACH_NOT_EXISTED(1702,"không tồn tại lịch",HttpStatus.NOT_FOUND),

    TIMEOUT(1703, "Quá thời gian quy định, Hãy thử lại tạo mới", HttpStatus.REQUEST_TIMEOUT);

    ErrorCode(int code, String message, HttpStatusCode statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }

    private final int code;
    private final String message;
    private final HttpStatusCode statusCode;
}
