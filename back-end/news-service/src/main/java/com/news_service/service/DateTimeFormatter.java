package com.news_service.service;

import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;

@Component
public class DateTimeFormatter {
    public String format(Date date){
        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss a dd/MM/yyyy");
        return sdf.format(date);
    }
}
