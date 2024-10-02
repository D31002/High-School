package com.notification_service.repository;

import com.notification_service.modal.ChatMessageEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ChatMessageRepository extends MongoRepository<ChatMessageEntity,String> {

    Page<ChatMessageEntity> findByClassRoomId(int classRoomId, Pageable pageable);
}
