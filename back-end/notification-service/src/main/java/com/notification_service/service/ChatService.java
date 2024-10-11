package com.notification_service.service;

import com.notification_service.dto.request.ChatMessage;
import com.notification_service.dto.response.ChatMessageResponse;
import com.notification_service.dto.response.PageResponse;
import com.notification_service.mapper.ChatMapper;
import com.notification_service.modal.ChatMessageEntity;
import com.notification_service.repository.ChatMessageRepository;
import com.notification_service.repository.httpclient.ProfileClient;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class ChatService {

    ChatMessageRepository chatMessageRepository;
    SimpMessagingTemplate messagingTemplate;
    ProfileClient profileClient;
    ChatMapper chatMapper;
    DateTimeFormatter dateTimeFormatter;

    public void processAndSendMessage(ChatMessage chatMessage) {
        ChatMessageEntity chatMessageEntity = chatMessageRepository.save(ChatMessageEntity.builder()
                .userProfileId(chatMessage.getUserProfileId())
                .content(chatMessage.getContent())
                .timestamp(new Date())
                .classRoomId(chatMessage.getClassRoomId())
                .build());

        ChatMessageResponse chatMessageResponse = chatMapper.toChatMessageResponse(chatMessageEntity);
        chatMessageResponse.setUserProfileResponse(profileClient.getProfileById(chatMessageEntity.getUserProfileId()).getResult());
        chatMessageResponse.setTime(dateTimeFormatter.format(chatMessageEntity.getTimestamp()));
        messagingTemplate.convertAndSend("/topic/messages/" + chatMessage.getClassRoomId(), chatMessageResponse);
    }

    public PageResponse<ChatMessageResponse> getMessages(int classRoomId,int page, int pageSize) {
        Sort sort = Sort.by("timestamp").descending();
        Pageable pageable = PageRequest.of(page -1,pageSize,sort);
        Page<ChatMessageEntity> chatMessageEntityPage = chatMessageRepository.findByClassRoomId(classRoomId,pageable);

        List<ChatMessageResponse> chatMessageResponseList =
                chatMessageEntityPage.stream().map(chatMessageEntity -> {
                    ChatMessageResponse chatMessageResponse = chatMapper.toChatMessageResponse(chatMessageEntity);
                    chatMessageResponse.setUserProfileResponse(profileClient.getProfileById(chatMessageEntity.getUserProfileId()).getResult());
                    chatMessageResponse.setTime(dateTimeFormatter.format(chatMessageEntity.getTimestamp()));
                    return chatMessageResponse;
                }).toList();

        return PageResponse.<ChatMessageResponse>builder()
                .currentPage(page)
                .pageSize(pageSize)
                .totalPages(chatMessageEntityPage.getTotalPages())  
                .totalElements((int) chatMessageEntityPage.getTotalElements())
                .data(chatMessageResponseList)
                .build();

    }
}
