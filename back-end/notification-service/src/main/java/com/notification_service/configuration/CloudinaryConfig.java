package com.notification_service.configuration;

import com.cloudinary.Cloudinary;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary(){
        Map<String,String> config = new HashMap<>();
        config.put("cloud_name" ,"danrswhe6");
        config.put("api_key" ,"412415116795817");
        config.put("api_secret" ,"lMhK09yKi7K3VLOUkxUB0rQps4E");
        return new Cloudinary(config);
    }
}
