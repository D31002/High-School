package com.schoolYear_Semester_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class SchoolYearSemesterServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(SchoolYearSemesterServiceApplication.class, args);
	}

}
