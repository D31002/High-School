package com.news_service.modal;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Builder
@Document(collection = "News")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class News {
    @Id
    String id;
    String title;
    String content;
    String imageMainUrl;
    Date createdAt;
}
