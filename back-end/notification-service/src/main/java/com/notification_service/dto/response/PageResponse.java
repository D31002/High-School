package com.notification_service.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Collections;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PageResponse<T>{
    int currentPage;
    int pageSize;
    int totalPages;
    int totalElements;

    @Builder.Default
    List<T> data = Collections.emptyList();
}
