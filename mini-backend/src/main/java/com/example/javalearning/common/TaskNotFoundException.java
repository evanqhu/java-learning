package com.example.javalearning.common;

public class TaskNotFoundException extends RuntimeException {
    public TaskNotFoundException(Long id) {
        super("没有找到 ID 为 " + id + " 的任务");
    }
}
