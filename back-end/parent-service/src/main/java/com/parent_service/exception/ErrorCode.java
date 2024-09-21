package com.parent_service.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "Lỗi chưa được phân loại", HttpStatus.INTERNAL_SERVER_ERROR),
    TOKEN_INVALID(1004, "Token không hợp lệ", HttpStatus.UNAUTHORIZED),
    UNAUTHENTICATED(1002, "Không được xác thực",HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1003,"không có quyền truy cập",HttpStatus.FORBIDDEN),

    //2000
    PARENT_NOT_EXISTED(2000,"Phụ huynh không tồn tại",HttpStatus.NOT_FOUND);

    private final int code;
    private final String message;
    private final HttpStatusCode statusCode;

    ErrorCode(int code, String message, HttpStatusCode statusCode){
        this.code = code;
        this.message =message;
        this.statusCode=statusCode;

    }
}
