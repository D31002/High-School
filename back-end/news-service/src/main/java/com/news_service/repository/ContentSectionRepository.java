package com.news_service.repository;

import com.news_service.modal.ContentSection;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface ContentSectionRepository extends MongoRepository<ContentSection,String> {

    @Query(value = "{ 'newsId': ?0 }", sort = "{ 'id': 1 }")
    List<ContentSection> findByNewsId(String newsId);
}
