package com.news_service.modal;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@Document(collection = "Images")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Image {
    @Id
    String id;
    String contentSectionId;
    String imageUrl;
    String description;
}
