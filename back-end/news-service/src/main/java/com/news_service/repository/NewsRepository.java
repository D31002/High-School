package com.news_service.repository;

import com.news_service.modal.News;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface NewsRepository extends MongoRepository<News,String> {
}
