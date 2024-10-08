package com.news_service.repository;

import com.news_service.modal.Image;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ImageRepository extends MongoRepository<Image,String> {
    List<Image> findByContentSectionId(String contentSectionId);
}
