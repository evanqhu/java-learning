package com.example.javalearning.config;

import com.example.javalearning.task.Priority;
import com.example.javalearning.task.Task;
import com.example.javalearning.task.TaskRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class ApplicationConfig {

    @Bean
    @ConditionalOnProperty(name = "app.seed.enabled", havingValue = "true", matchIfMissing = true)
    CommandLineRunner seedTasks(TaskRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                repository.save(new Task("安装 JDK 21", "让 java -version 输出 21", Priority.HIGH));
                repository.save(new Task("启动 Spring Boot", "运行 ./mvnw spring-boot:run", Priority.HIGH));
                repository.save(new Task("调用 Todo API", "用 curl 或 Swagger 创建第一条任务", Priority.MEDIUM));
            }
        };
    }

    @Bean
    WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins("http://localhost:5173")
                        .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE");
            }
        };
    }
}
