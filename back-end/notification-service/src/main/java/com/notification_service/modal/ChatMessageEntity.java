package com.notification_service.modal;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Builder
@Document(collection = "messages")
public class ChatMessageEntity {
    @Id
    private String id;
    private int userProfileId;
    private String content;
    private Date timestamp;
    private int classRoomId;
}
