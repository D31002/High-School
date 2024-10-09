package com.news_service.controller;

import com.news_service.dto.response.ApiResponse;
import com.news_service.dto.response.ContentSectionResponse;
import com.news_service.service.ContentSectionService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/pl/contentSection")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class ContentSectionController {

    ContentSectionService contentSectionService;


    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/create")
    public ApiResponse<ContentSectionResponse> createContentSection(
            @RequestPart(value = "sectionId",required = false) String sectionId,
            @RequestPart("newsId") String newsId,
            @RequestPart(value = "titleSection",required = false) String titleSection,
            @RequestPart(value = "contentSection",required = false) String contentSection,
            @RequestPart(value = "images" ,required = false) List<MultipartFile> images) throws IOException {
        ContentSectionResponse result = contentSectionService.createContentSection(sectionId,newsId,titleSection,contentSection,images);
        return ApiResponse.<ContentSectionResponse>builder().result(result).build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/deleteById/{sectionId}")
    ApiResponse<String> deleteById(@PathVariable String sectionId){
        contentSectionService.deleteById(sectionId);
        return ApiResponse.<String>builder().result("Xóa thành công").build();
    }

}
