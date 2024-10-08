package com.news_service.mapper;

import com.news_service.dto.response.ImagesResponse;
import com.news_service.dto.response.NewsResponse;
import com.news_service.modal.Image;
import com.news_service.modal.News;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ImageMapper {
    ImagesResponse toImagesResponse(Image image);
}
