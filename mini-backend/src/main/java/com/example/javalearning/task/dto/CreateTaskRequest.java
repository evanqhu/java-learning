package com.example.javalearning.task.dto;

import com.example.javalearning.task.Priority;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CreateTaskRequest(
        @NotBlank(message = "标题不能为空")
        @Size(max = 120, message = "标题不能超过 120 个字符")
        String title,

        @Size(max = 1000, message = "描述不能超过 1000 个字符")
        String description,

        @NotNull(message = "优先级不能为空")
        Priority priority
) {
}
