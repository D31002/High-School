package com.notification_service.controller;

import com.notification_service.dto.response.ApiResponse;
import com.notification_service.dto.response.ChatMessageResponse;
import com.notification_service.dto.response.PageResponse;
import com.notification_service.service.ChatService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pl")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class ChatMessageRestController {

    ChatService chatService;

    @GetMapping("/getMessages/{classRoomId}")
    public ApiResponse<PageResponse<ChatMessageResponse>> getMessagesByClassRoomId(
            @PathVariable int classRoomId,
            @RequestParam(required = false,defaultValue = "1") int page,
            @RequestParam(required = false,defaultValue = "7") int pageSize) {
        PageResponse<ChatMessageResponse> result = chatService.getMessages(classRoomId,page,pageSize);
        return ApiResponse.<PageResponse<ChatMessageResponse>>builder().result(result).build();
    }
}
