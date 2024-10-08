package com.news_service.modal;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@Document(collection = "ContentSection")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ContentSection {
    @Id
    String id;
    String newsId;
    String sectionTitle;
    String sectionContent;
}
