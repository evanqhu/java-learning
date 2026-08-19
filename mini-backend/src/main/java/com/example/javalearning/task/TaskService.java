package com.example.javalearning.task;

import com.example.javalearning.task.dto.CreateTaskRequest;
import com.example.javalearning.task.dto.TaskResponse;
import com.example.javalearning.task.dto.UpdateTaskRequest;

import java.util.List;

public interface TaskService {
    List<TaskResponse> findAll();
    TaskResponse findById(Long id);
    TaskResponse create(CreateTaskRequest request);
    TaskResponse update(Long id, UpdateTaskRequest request);
    TaskResponse complete(Long id);
    void delete(Long id);
}
