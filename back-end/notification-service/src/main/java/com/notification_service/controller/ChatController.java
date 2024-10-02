package com.notification_service.controller;

import com.notification_service.dto.request.ChatMessage;
import com.notification_service.service.ChatService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class ChatController {

    ChatService chatService;

    @MessageMapping("/chat")
    public void sendMessage(@Payload ChatMessage chatMessage){
        chatService.processAndSendMessage(chatMessage);
    }
}
