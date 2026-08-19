# Java Learning Mini Backend

一个专门用于学习 Spring Boot 启动、分层和 CRUD 的 Todo API。默认使用内存 H2 数据库，不依赖 MySQL、Redis、Docker 或公司内网。

## 环境要求

- macOS
- JDK 21：`java -version` 和 `javac -version` 均应显示 21
- 不要求全局安装 Maven，项目提供 `./mvnw`

安装 JDK：

```bash
brew install --cask temurin@21
java -version
javac -version
```

## 启动

```bash
cd /Users/evanqhu/code/java-learning/mini-backend
chmod +x mvnw
./mvnw spring-boot:run
```

看到 `Started JavaLearningApplication` 后访问：

- Health: <http://localhost:8080/api/health>
- Tasks: <http://localhost:8080/api/tasks>
- Swagger UI: <http://localhost:8080/swagger-ui.html>
- H2 Console: <http://localhost:8080/h2-console>

H2 Console 参数：

- JDBC URL：`jdbc:h2:mem:javalearning`
- User Name：`sa`
- Password：留空

## 常用命令

```bash
# 测试
./mvnw test

# 打包
./mvnw clean package

# 运行打包结果
java -jar target/java-learning-mini-backend-1.0.0.jar

# 开发 profile，会输出 SQL 和更多应用日志
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev

# 临时换端口
./mvnw spring-boot:run -Dspring-boot.run.arguments=--server.port=8081
```

## API

| 方法 | 路径 | 作用 |
| --- | --- | --- |
| GET | `/api/health` | 健康检查 |
| GET | `/api/tasks` | 查询全部任务 |
| GET | `/api/tasks/{id}` | 查询一个任务 |
| POST | `/api/tasks` | 创建任务 |
| PUT | `/api/tasks/{id}` | 完整更新任务 |
| PATCH | `/api/tasks/{id}/complete` | 标记完成 |
| DELETE | `/api/tasks/{id}` | 删除任务 |

创建示例：

```bash
curl -X POST http://localhost:8080/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"学习 Java","description":"启动 Todo API","priority":"HIGH"}'
```

## 目录怎么读

```text
com.example.javalearning
├── JavaLearningApplication.java   启动入口
├── common/                        统一响应与异常处理
├── config/                        初始化数据与跨域配置
└── task/
    ├── TaskController.java        HTTP 协议层
    ├── TaskService.java           业务能力接口
    ├── TaskServiceImpl.java       业务实现
    ├── TaskRepository.java        数据访问
    ├── Task.java                  数据库实体
    └── dto/                       API 输入与输出
```

阅读一条接口时，建议按 `Controller → Service → Repository → Entity` 的顺序追踪。

## 当前验证边界

如果本机还没有 JDK，本项目无法执行编译和测试。安装 JDK 21 后运行 `./mvnw test` 即可完成第一轮验证。
