package com.news_service.service;

import com.news_service.Exception.AppException;
import com.news_service.Exception.ErrorCode;
import com.news_service.dto.request.ListNewsIdRequest;
import com.news_service.dto.response.ContentSectionResponse;
import com.news_service.dto.response.NewsResponse;
import com.news_service.dto.response.PageResponse;
import com.news_service.mapper.NewsMapper;
import com.news_service.modal.ContentSection;
import com.news_service.modal.News;
import com.news_service.repository.ContentSectionRepository;
import com.news_service.repository.NewsRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class NewsService {

    NewsRepository newsRepository;
    ContentSectionRepository contentSectionRepository;
    NewsMapper newsMapper;
    FileUpload fileUpload;
    ContentSectionService contentSectionService;
    DateTimeFormatter dateTimeFormatter;

    public PageResponse<NewsResponse> getAllNews(int page, int pageSize) {
        Sort sort = Sort.by("createdAt").descending();
        Pageable pageable = PageRequest.of(page -1,pageSize,sort);

        Page<News> newsResponsePage = newsRepository.findAll(pageable);

        List<NewsResponse> newsResponseList = newsResponsePage.stream()
                .map(news -> {
                    NewsResponse newsResponse = newsMapper.toNewsResponse(news);
                    List<ContentSectionResponse> contentSectionResponseList = contentSectionService.getAllContentSectionByNewsId(news.getId());
                    newsResponse.setContentSectionResponses(contentSectionResponseList);
                    newsResponse.setCreatedDate(dateTimeFormatter.format(news.getCreatedAt()));
                    return newsResponse;
                }).toList();


        return PageResponse.<NewsResponse>builder()
                .currentPage(page)
                .pageSize(pageSize)
                .totalPages(newsResponsePage.getTotalPages())
                .totalElements(newsResponsePage.getTotalElements())
                .data(newsResponseList)
                .build();
    }

    public NewsResponse getById(String id) {
        News news = newsRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.NEWS_NOT_EXISTED));
        NewsResponse newsResponse = newsMapper.toNewsResponse(news);
        List<ContentSectionResponse> contentSectionResponseList = contentSectionService.getAllContentSectionByNewsId(news.getId());
        newsResponse.setContentSectionResponses(contentSectionResponseList);
        newsResponse.setCreatedDate(dateTimeFormatter.format(news.getCreatedAt()));
        return newsResponse;

    }

    public NewsResponse createNews(
            String newsId,String title, String content, MultipartFile mainImage) throws IOException {

        if(newsId != null){
            return editNews(newsId,title,content,mainImage);
        }

        String mainUrl = null;
        if(mainImage != null){
            mainUrl = fileUpload.uploadFile(mainImage);
        }
        return newsMapper.toNewsResponse(newsRepository.save(
                News.builder().title(title).content(content).imageMainUrl(mainUrl).createdAt(new Date()).build()));
    }

    public NewsResponse editNews(String newsId,String title, String content, MultipartFile mainImage) throws IOException {
        News news = newsRepository.findById(newsId).orElseThrow(() -> new AppException(ErrorCode.NEWS_NOT_EXISTED));
        news.setTitle(title);
        news.setContent(content);
        if(mainImage != null){
            String mainUrl = fileUpload.uploadFile(mainImage);
            news.setImageMainUrl(mainUrl);
        }
        return newsMapper.toNewsResponse(newsRepository.save(news));
    }

    public void deleteNews(ListNewsIdRequest request) {
        for(String newsId : request.getNewsIds()){
            News news = newsRepository.findById(newsId)
                    .orElseThrow(() -> new AppException(ErrorCode.NEWS_NOT_EXISTED));

            newsRepository.delete(news);

            List<ContentSection> contentSectionList =
                    contentSectionRepository.findByNewsId(newsId);

            for(ContentSection contentSection : contentSectionList){
                contentSectionService.deleteById(contentSection.getId());
            }

        }
    }
}
