package com.news_service.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class NewsResponse {
    String id;
    String title;
    String content;
    String imageMainUrl;
    String createdDate;
    List<ContentSectionResponse> contentSectionResponses;
}
