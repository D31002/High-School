package com.news_service.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ContentSectionResponse {
    String id;
    String sectionTitle;
    String sectionContent;
    List<ImagesResponse> imagesResponseList;
}
