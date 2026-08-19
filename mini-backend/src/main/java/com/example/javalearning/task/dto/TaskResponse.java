package com.example.javalearning.task.dto;

import com.example.javalearning.task.Priority;

import java.time.LocalDateTime;

public record TaskResponse(
        Long id,
        String title,
        String description,
        boolean completed,
        Priority priority,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
