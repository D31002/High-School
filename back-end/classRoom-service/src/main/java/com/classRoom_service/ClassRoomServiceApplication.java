package com.classRoom_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class ClassRoomServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ClassRoomServiceApplication.class, args);
	}

}
