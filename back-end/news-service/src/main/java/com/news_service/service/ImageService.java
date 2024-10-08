package com.news_service.service;

import com.news_service.dto.response.ImagesResponse;
import com.news_service.mapper.ImageMapper;
import com.news_service.modal.Image;
import com.news_service.repository.ImageRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class ImageService {
    ImageRepository imageRepository;
    ImageMapper imageMapper;
    FileUpload fileUpload;

    public List<ImagesResponse> getAllImageByContentSectionId(String contentSectionId){
        List<Image> imageList = imageRepository.findByContentSectionId(contentSectionId);

        return imageList.stream().map(imageMapper::toImagesResponse).toList();
    }


    public List<ImagesResponse> createImages(String contentSectionId,List<MultipartFile> images) throws IOException {

        List<ImagesResponse> imagesResponseList = new ArrayList<>();

        for(MultipartFile image : images){
            String url = fileUpload.uploadFile(image);

            Image i = imageRepository.save(
                    Image.builder()
                            .contentSectionId(contentSectionId)
                            .imageUrl(url)
                            .build());
            ImagesResponse imagesResponse = imageMapper.toImagesResponse(i);
            imagesResponseList.add(imagesResponse);
        }
        return imagesResponseList;
    }

}
