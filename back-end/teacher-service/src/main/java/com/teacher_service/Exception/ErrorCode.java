package com.teacher_service.Exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "Lỗi chưa được phân loại", HttpStatus.INTERNAL_SERVER_ERROR),
    TOKEN_INVALID(1004, "Token không hợp lệ", HttpStatus.UNAUTHORIZED),
    UNAUTHENTICATED(1002, "Không được xác thực",HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1003,"không có quyền truy cập",HttpStatus.FORBIDDEN),

    TEACHER_NOT_EXISTED(1500, "Teacher không tồn tại", HttpStatus.NOT_FOUND),
    TEACHER_CODE_EXISTED(1501,"Mã số đã tồn tại",HttpStatus.BAD_REQUEST),
    INVALID_REQUEST(1502,"Request không có dữ liệu",HttpStatus.BAD_REQUEST),
    TEACHER_EXISTED(1503,"Đã tồn tại giáo viên",HttpStatus.BAD_REQUEST);

    ErrorCode(int code, String message, HttpStatusCode statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }

    private final int code;
    private final String message;
    private final HttpStatusCode statusCode;
}
