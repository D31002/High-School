package com.teacher_service.Configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI openAPI(){
        return new OpenAPI().info(
                new Info().title("Teacher-service")
                        .version("v1").description("Teacher")
                        .license(new License().name("API Identity").url("http://localhost:8072/teacher")))
                .servers(List.of(new Server().url("http://localhost:8072/teacher").description("server test")))
                .components(new Components().addSecuritySchemes("bearerAuth",
                        new SecurityScheme().type(SecurityScheme.Type.HTTP).scheme("bearer").bearerFormat("JWT")))
                .security(List.of(new SecurityRequirement().addList("bearerAuth")));
    }

    @Bean
    public GroupedOpenApi groupedOpenApi(){
        return GroupedOpenApi.builder()
                .group("Teacher-service")
                .packagesToScan("com.teacher_service.controller")
                .build();
    }
}
