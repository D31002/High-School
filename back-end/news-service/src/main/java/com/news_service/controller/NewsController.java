package com.news_service.controller;

import com.news_service.dto.request.ListNewsIdRequest;
import com.news_service.dto.response.ApiResponse;
import com.news_service.dto.response.NewsResponse;
import com.news_service.dto.response.PageResponse;
import com.news_service.service.NewsService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


@RestController
@RequestMapping("/pl/news")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class NewsController {

    NewsService newsService;

    @GetMapping
    ApiResponse<PageResponse<NewsResponse>> getAllNews(
            @RequestParam(required = false,defaultValue = "1") int page,
            @RequestParam(required = false,defaultValue = "6") int pageSize
    ){
        PageResponse<NewsResponse> result = newsService.getAllNews(page,pageSize);
        return ApiResponse.<PageResponse<NewsResponse>>builder().result(result).build();
    }

    @GetMapping("/{id}")
    ApiResponse<NewsResponse> getById(@PathVariable String id){
        NewsResponse result = newsService.getById(id);
        return ApiResponse.<NewsResponse>builder().result(result).build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/create")
    ApiResponse<NewsResponse> createNews(
            @RequestPart(value = "newsId",required = false) String newsId,
            @RequestPart("title") String title,
            @RequestPart(value = "content",required = false) String content,
            @RequestPart(value = "mainImage" ,required = false) MultipartFile mainImage) throws IOException {
        NewsResponse result = newsService.createNews(newsId,title,content,mainImage);
        return ApiResponse.<NewsResponse>builder().result(result).build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete")
    ApiResponse<String> deleteNews(@RequestBody ListNewsIdRequest request){
        newsService.deleteNews(request);
        return ApiResponse.<String>builder().result("Xóa thành công").build();
    }


}
