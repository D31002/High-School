package com.student_service.Exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "Lỗi chưa được phân loại", HttpStatus.INTERNAL_SERVER_ERROR),
    TOKEN_INVALID(1004, "Token không hợp lệ", HttpStatus.UNAUTHORIZED),
    UNAUTHENTICATED(1002, "Không được xác thực",HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1003,"không có quyền truy cập",HttpStatus.FORBIDDEN),

    STUDENT_NOT_EXISTED(1800, "Student không tồn tại", HttpStatus.NOT_FOUND),
    STUDENT_CODE_EXISTED(1801,"Mã số đã tồn tại",HttpStatus.BAD_REQUEST),
    INVALID_REQUEST(1802,"Request không có dữ liệu",HttpStatus.BAD_REQUEST),
    STUDENT_EXISTED(1803,"Đã tồn tại học sinh",HttpStatus.BAD_REQUEST),
    SHEET_NOT_EXISTED(1804,"Không có bảng đó trong tệp excel",HttpStatus.BAD_REQUEST),
    STUDENT_ABOVE_AVERAGE_NOT_EXISTED(1805,"Không có học sinh nào trên trung bình",HttpStatus.NOT_FOUND);




    ErrorCode(int code, String message, HttpStatusCode statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }

    private final int code;
    private final String message;
    private final HttpStatusCode statusCode;
}
