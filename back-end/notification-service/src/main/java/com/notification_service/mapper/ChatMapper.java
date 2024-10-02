package com.notification_service.mapper;

import com.notification_service.dto.response.ChatMessageResponse;
import com.notification_service.modal.ChatMessageEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ChatMapper {
    ChatMessageResponse toChatMessageResponse(ChatMessageEntity chatMessageEntity);
}
