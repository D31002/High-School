package com.news_service.service;

import com.news_service.Exception.AppException;
import com.news_service.Exception.ErrorCode;
import com.news_service.dto.response.ContentSectionResponse;
import com.news_service.dto.response.ImagesResponse;
import com.news_service.mapper.ContentSectionMapper;
import com.news_service.modal.ContentSection;
import com.news_service.repository.ContentSectionRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class ContentSectionService {

    ContentSectionRepository contentSectionRepository;
    ContentSectionMapper contentSectionMapper;
    ImageService imageService;

    public List<ContentSectionResponse> getAllContentSectionByNewsId(String newsId){

        List<ContentSection> contentSectionList =
                contentSectionRepository.findByNewsId(newsId);

        return contentSectionList.stream().map(contentSection -> {
            ContentSectionResponse contentSectionResponse = contentSectionMapper.toContentSectionResponse(contentSection);
            List<ImagesResponse> imagesResponseList = imageService.getAllImageByContentSectionId(contentSection.getId());
            contentSectionResponse.setImagesResponseList(imagesResponseList);
            return contentSectionResponse;
        }).toList();
    }


    public ContentSectionResponse createContentSection(
            String sectionId,String newsId, String titleSection, String contentSection, List<MultipartFile> images) throws IOException {

        if(sectionId != null){
            return editContentSection( sectionId,  titleSection,  contentSection,  images);
        }

        ContentSection c = contentSectionRepository.save(
                ContentSection.builder()
                    .newsId(newsId)
                    .sectionTitle(titleSection)
                    .sectionContent(contentSection)
                    .build());

        List<ImagesResponse> imagesResponseList = null;

        if (!CollectionUtils.isEmpty(images)) {
            imagesResponseList = imageService.createImages(c.getId(), images);
        }

        ContentSectionResponse contentSectionResponse = contentSectionMapper.toContentSectionResponse(c);
        contentSectionResponse.setImagesResponseList(imagesResponseList);
        return contentSectionResponse;

    }

    public ContentSectionResponse editContentSection(
            String sectionId, String titleSection, String contentSection, List<MultipartFile> images) {

        ContentSection c = contentSectionRepository.findById(sectionId)
                .orElseThrow(() -> new AppException(ErrorCode.SECTION_NOT_EXISTED));

        c.setSectionTitle(titleSection);
        c.setSectionContent(contentSection);

        ContentSectionResponse contentSectionResponse = contentSectionMapper.toContentSectionResponse(c);
        return contentSectionResponse;
    }
}
