package com.AcademicResult_Service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class AcademicResultServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(AcademicResultServiceApplication.class, args);
	}

}
