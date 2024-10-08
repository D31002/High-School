package com.news_service.mapper;

import com.news_service.dto.response.NewsResponse;
import com.news_service.modal.News;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface NewsMapper {
    NewsResponse toNewsResponse(News news);
}
