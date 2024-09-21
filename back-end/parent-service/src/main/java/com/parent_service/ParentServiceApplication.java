package com.parent_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class ParentServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ParentServiceApplication.class, args);
	}

}
