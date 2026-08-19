package com.example.javalearning.task;

import com.example.javalearning.common.TaskNotFoundException;
import com.example.javalearning.task.dto.CreateTaskRequest;
import com.example.javalearning.task.dto.TaskResponse;
import com.example.javalearning.task.dto.UpdateTaskRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    public TaskServiceImpl(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public List<TaskResponse> findAll() {
        return taskRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    public TaskResponse findById(Long id) {
        return toResponse(findTask(id));
    }

    @Override
    @Transactional
    public TaskResponse create(CreateTaskRequest request) {
        var task = new Task(request.title(), request.description(), request.priority());
        return toResponse(taskRepository.save(task));
    }

    @Override
    @Transactional
    public TaskResponse update(Long id, UpdateTaskRequest request) {
        var task = findTask(id);
        task.setTitle(request.title());
        task.setDescription(request.description());
        task.setPriority(request.priority());
        task.setCompleted(request.completed());
        return toResponse(taskRepository.save(task));
    }

    @Override
    @Transactional
    public TaskResponse complete(Long id) {
        var task = findTask(id);
        task.setCompleted(true);
        return toResponse(taskRepository.save(task));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        taskRepository.delete(findTask(id));
    }

    private Task findTask(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException(id));
    }

    private TaskResponse toResponse(Task task) {
        return new TaskResponse(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.isCompleted(),
                task.getPriority(),
                task.getCreatedAt(),
                task.getUpdatedAt()
        );
    }
}
