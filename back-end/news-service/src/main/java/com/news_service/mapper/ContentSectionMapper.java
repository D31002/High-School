package com.news_service.mapper;

import com.news_service.dto.response.ContentSectionResponse;
import com.news_service.dto.response.NewsResponse;
import com.news_service.modal.ContentSection;
import com.news_service.modal.News;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ContentSectionMapper {
    ContentSectionResponse toContentSectionResponse(ContentSection contentSection);
}
