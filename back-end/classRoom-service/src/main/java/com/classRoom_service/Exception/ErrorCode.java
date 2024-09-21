package com.classRoom_service.Exception;

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

    GRADE_NOT_EXISTED(1305,"Khối không tồn tại",HttpStatus.NOT_FOUND),
    CLASS_NOT_EXISTED(1300,"Lớp học không tồn tại",HttpStatus.NOT_FOUND),
    CLASS_EXISTED(1301, "Lớp đã tồn tại",HttpStatus.BAD_REQUEST),
    STUDENT_EXISTED(1302,"Lớp học có học sinh",HttpStatus.BAD_REQUEST),
    TEACHER_ALREADY_ASSIGNED(1303, "Giáo viên đã được phân công", HttpStatus.BAD_REQUEST),
    NO_DATA(1304,"Không có dữ liệu" ,HttpStatus.BAD_REQUEST ),
    CLASS_HAS_STUDENTS(1306, "Lớp học đã tồn tại học sinh", HttpStatus.BAD_REQUEST);


    ErrorCode(int code, String message, HttpStatusCode statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }

    private final int code;
    private final String message;
    private final HttpStatusCode statusCode;
}
