package com.AcademicResult_Service.Exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "Lỗi chưa được phân loại", HttpStatus.INTERNAL_SERVER_ERROR),
    TOKEN_INVALID(1004, "Token không hợp lệ", HttpStatus.UNAUTHORIZED),
    UNAUTHENTICATED(1002, "Không được xác thực",HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1003,"không có quyền truy cập",HttpStatus.FORBIDDEN),

    //1900
    CATEGORY_NOT_EXISTED(1900,"Loại điểm không tồn tại",HttpStatus.NOT_FOUND),
    SCORE_NOT_EXISTED(1901,"Điểm số không tồn tại", HttpStatus.NOT_FOUND),
    NO_DATA(1902,"Không có dữ liệu", HttpStatus.BAD_REQUEST),
    SUBJECT_NOT_ASSIGNED_TO_TEACHER(1903,"Không có quyền chỉnh sửa điểm" , HttpStatus.BAD_REQUEST),
    NOT_ENOUGH_SCORES_TO_CALCULATE(1904, "Không đủ điểm để tính toán", HttpStatus.BAD_REQUEST),
    ACADEMIC_RESULT_NOT_EXISTED(1905, "Kết quả học tập không tồn tại", HttpStatus.NOT_FOUND),
    ACADEMIC_PERFORMANCE_NOT_EXISTED(1906, "Học lực không tồn tại", HttpStatus.NOT_FOUND),
    CONDUCT_NOT_EXISTED(1906, "Hạnh kiểm không tồn tại", HttpStatus.NOT_FOUND);


    ErrorCode(int code, String message, HttpStatusCode statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }

    private final int code;
    private final String message;
    private final HttpStatusCode statusCode;
}
