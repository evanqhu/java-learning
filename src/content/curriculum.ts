export interface ContentBlock {
  type: 'text' | 'code' | 'note' | 'compare' | 'steps' | 'check'
  title?: string
  body?: string
  language?: string
  items?: string[]
  left?: { label: string; value: string }
  right?: { label: string; value: string }
}

export interface Lesson {
  slug: string
  order: number
  shortTitle: string
  title: string
  eyebrow: string
  duration: string
  summary: string
  outcomes: string[]
  sections: Array<{ title: string; intro?: string; blocks: ContentBlock[] }>
}

export const lessons: Lesson[] = [
  {
    slug: 'setup', order: 1, shortTitle: '环境安装', title: '把 Java 工位搭起来',
    eyebrow: 'STAGE 01 · MACOS', duration: '25 分钟',
    summary: '安装 JDK 21，理解 JVM / JRE / JDK，并让终端与 IntelliJ 都认得 Java。',
    outcomes: ['能解释 JDK、JRE、JVM 的关系', '终端可运行 java 与 javac', 'IntelliJ 项目 SDK 指向 JDK 21'],
    sections: [
      {
        title: '先建立一张地图',
        intro: 'Node.js 把运行时和常用工具打包得很自然；Java 把职责拆得更清楚。你写的 .java 源码先由 javac 编译，再由 JVM 运行字节码。',
        blocks: [
          { type: 'compare', left: { label: '前端世界', value: 'TypeScript → JavaScript → Node/浏览器' }, right: { label: 'Java 世界', value: 'Java 源码 → bytecode → JVM' } },
          { type: 'note', title: '三个缩写', body: 'JVM 负责运行；JRE 是运行环境；JDK 是开发套件，包含编译器、工具和运行环境。开发者直接安装 JDK 即可。' },
        ],
      },
      {
        title: '安装 JDK 21',
        intro: '本机当前没有 Java Runtime。下面的命令需要你在终端手动执行；网站和 demo 不会擅自修改全局环境。',
        blocks: [
          { type: 'code', language: 'bash', title: '任意目录 · 安装 Temurin JDK 21', body: 'brew install --cask temurin@21\n/usr/libexec/java_home -V\njava -version\njavac -version' },
          { type: 'code', language: 'text', title: '预期关键输出', body: 'openjdk version "21..."\njavac 21...' },
          { type: 'note', title: '如果 java 仍找不到', body: '重新打开终端，再运行 /usr/libexec/java_home -V。若能看到 21，则把 export JAVA_HOME=$(/usr/libexec/java_home -v 21) 加入 ~/.zshrc，然后 source ~/.zshrc。' },
        ],
      },
      {
        title: '配置 IntelliJ IDEA',
        blocks: [
          { type: 'steps', items: ['安装并打开 IntelliJ IDEA Community 或 Ultimate。', 'Open mini-backend 目录，选择 pom.xml 作为 Maven 项目导入。', '进入 Project Structure → SDK，选择刚安装的 JDK 21。', '等待右下角 Maven 索引与依赖下载完成。', '打开 JavaLearningApplication.java，运行 main 方法。'] },
          { type: 'check', title: '完成标准', items: ['java -version 显示 21', 'javac -version 显示 21', 'IntelliJ Project SDK 显示 21'] },
        ],
      },
    ],
  },
  {
    slug: 'java-basics', order: 2, shortTitle: 'Java 最小集', title: '用 TypeScript 经验读懂 Java',
    eyebrow: 'STAGE 02 · LANGUAGE', duration: '35 分钟',
    summary: '不背语法大全，只掌握看懂 Todo 项目所需的类、接口、集合、枚举、record 与异常。',
    outcomes: ['看懂 package、class、record 和 interface', '理解 Java 的显式类型与构造器', '能沿着方法调用阅读一段后端代码'],
    sections: [
      {
        title: '类、对象与 record',
        intro: 'Java 文件通常以一个主要类型为中心。Entity 用 class 表示可变的数据库对象；API 响应则很适合用不可变的 record。',
        blocks: [
          { type: 'code', language: 'java', title: 'Java', body: 'public record TaskResponse(\n    Long id,\n    String title,\n    boolean completed\n) {}' },
          { type: 'code', language: 'typescript', title: '对应的 TypeScript 心智模型', body: 'type TaskResponse = {\n  id: number\n  title: string\n  completed: boolean\n}' },
          { type: 'note', title: '关键差异', body: 'TypeScript 类型编译后消失；Java 类型会参与编译并进入运行时世界。record 会自动生成构造器、访问器、equals 和 toString。' },
        ],
      },
      {
        title: '接口与实现',
        blocks: [
          { type: 'code', language: 'java', body: 'public interface TaskService {\n    List<TaskResponse> findAll();\n    TaskResponse create(CreateTaskRequest request);\n}\n\n@Service\npublic class TaskServiceImpl implements TaskService {\n    // 实际业务实现\n}' },
          { type: 'compare', left: { label: 'TypeScript', value: 'interface 主要约束类型' }, right: { label: 'Java + Spring', value: 'interface 约束能力，@Service 实现被容器管理' } },
        ],
      },
      {
        title: '集合、Stream 与异常',
        blocks: [
          { type: 'code', language: 'java', body: 'return repository.findAll().stream()\n    .map(this::toResponse)\n    .toList();' },
          { type: 'text', body: 'List 类似数组；Stream 的 map 类似 JavaScript Array.map，但它是一条惰性处理流水线。repository.findById(id).orElseThrow(...) 则把“可能不存在”显式建模。' },
          { type: 'check', title: '小练习', items: ['在 Priority 中增加 URGENT', '找到 TaskServiceImpl 中的 toResponse', '说出 TaskNotFoundException 在哪里被转成 404'] },
        ],
      },
    ],
  },
  {
    slug: 'spring-boot', order: 3, shortTitle: 'Spring Boot', title: '从一次 HTTP 请求看懂分层',
    eyebrow: 'STAGE 03 · FRAMEWORK', duration: '40 分钟',
    summary: '沿着 GET /api/tasks 走一遍 Controller → Service → Repository → H2。',
    outcomes: ['理解依赖注入解决了什么', '能定位一个 API 的代码入口', '知道 DTO、Entity、Repository 各自负责什么'],
    sections: [
      {
        title: '请求的旅程',
        blocks: [
          { type: 'steps', items: ['浏览器向 GET /api/tasks 发请求。', 'TaskController 根据 @GetMapping 接住请求。', 'Controller 调用 TaskService，不直接写数据库逻辑。', 'TaskServiceImpl 编排规则并调用 TaskRepository。', 'Spring Data JPA 生成 SQL，H2 返回数据。', 'Entity 被转换成 TaskResponse，再序列化成 JSON。'] },
          { type: 'code', language: 'java', title: 'Controller 只做协议层工作', body: '@GetMapping\npublic ApiResponse<List<TaskResponse>> findAll() {\n    return ApiResponse.ok(taskService.findAll());\n}' },
        ],
      },
      {
        title: '依赖注入不是魔法',
        intro: '你没有 new TaskServiceImpl()。Spring 启动时扫描 @Service，把实例放进容器，再通过构造器交给 Controller。',
        blocks: [
          { type: 'compare', left: { label: '手动组装', value: 'new Controller(new Service(new Repository()))' }, right: { label: 'Spring IoC', value: '声明依赖，由容器创建和连接对象' } },
          { type: 'note', title: '实用规则', body: '优先构造器注入。依赖清晰、方便测试，也不会出现字段尚未初始化的中间状态。' },
        ],
      },
      {
        title: '配置与 Profile',
        blocks: [
          { type: 'code', language: 'bash', title: '用 dev profile 启动', body: './mvnw spring-boot:run -Dspring-boot.run.profiles=dev' },
          { type: 'text', body: 'application.yml 是公共默认值，application-dev.yml 只覆盖开发环境。公司项目同样使用 dev/test/prod 分层配置，但还接入了 Redis、Apollo 和多数据源，这些不是入门 demo 的启动前提。' },
        ],
      },
    ],
  },
  {
    slug: 'launch-lab', order: 4, shortTitle: '启动实验室', title: '真正把 Java 服务跑起来',
    eyebrow: 'STAGE 04 · RUN', duration: '30 分钟',
    summary: '命令行、IntelliJ、jar 三种方式启动；知道每条日志和每个失败意味着什么。',
    outcomes: ['能用 ./mvnw 启动应用', '能用 curl 和 Swagger 验证接口', '能处理端口、JDK、依赖和 404 问题'],
    sections: [
      {
        title: '方式一：开发模式',
        blocks: [
          { type: 'code', language: 'bash', title: '在 mini-backend 目录执行', body: 'cd /Users/evanqhu/code/java-learning/mini-backend\nchmod +x mvnw\n./mvnw spring-boot:run' },
          { type: 'note', title: '第一次为什么慢', body: 'mvnw 会准备 Maven，Maven 再从中央仓库下载 Spring Boot 等依赖。看到 “Started JavaLearningApplication” 才算启动成功。按 Control + C 停止。' },
        ],
      },
      {
        title: '验证，而不是凭感觉',
        blocks: [
          { type: 'code', language: 'bash', title: '另开一个终端', body: 'curl http://localhost:8080/api/health\ncurl http://localhost:8080/api/tasks\nopen http://localhost:8080/swagger-ui.html\nopen http://localhost:8080/h2-console' },
          { type: 'text', body: 'H2 Console 使用 JDBC URL jdbc:h2:mem:javalearning，用户名 sa，密码留空。Swagger 用来探索接口；curl 更适合建立你对 HTTP 的直接感受。' },
        ],
      },
      {
        title: '方式二：打包后运行',
        blocks: [
          { type: 'code', language: 'bash', body: './mvnw clean package\njava -jar target/java-learning-mini-backend-1.0.0.jar' },
          { type: 'compare', left: { label: 'spring-boot:run', value: '开发时直接从源码与依赖启动' }, right: { label: 'java -jar', value: '运行已经打包好的可交付制品' } },
        ],
      },
      {
        title: '故障速查',
        blocks: [
          { type: 'steps', items: ['java: command not found → 安装 JDK 21，重开终端，检查 java -version。', 'UnsupportedClassVersionError → 运行时 JDK 低于编译 JDK，检查 java 与 JAVA_HOME。', 'Permission denied: ./mvnw → 执行 chmod +x mvnw。', 'Port 8080 already in use → lsof -nP -iTCP:8080 -sTCP:LISTEN，或用 --server.port=8081。', '404 → 核对 context path、Controller 映射、HTTP 方法与完整 URL。', 'BeanCreationException → 从最底部 Caused by 开始读，通常是真正原因。', '依赖下载失败 → 检查网络、代理和 ~/.m2/settings.xml，之后执行 ./mvnw -U test。', 'JSON 解析失败 → 对照 Request DTO 字段、类型和 Content-Type: application/json。'] },
          { type: 'check', title: '完成标准', items: ['日志出现 Started JavaLearningApplication', 'health 返回 success: true', 'Swagger UI 能列出 7 个 API'] },
        ],
      },
    ],
  },
  {
    slug: 'todo-lab', order: 5, shortTitle: 'Todo 实战', title: '从 GET 到完整 CRUD',
    eyebrow: 'STAGE 05 · BUILD', duration: '60 分钟',
    summary: '用真实 Todo API 串起请求 DTO、校验、业务层、持久化、异常与测试。',
    outcomes: ['能新增、查询、更新、完成和删除 Todo', '理解输入校验和全局异常处理', '能修改一个字段并补上测试'],
    sections: [
      {
        title: '创建一个 Todo',
        blocks: [
          { type: 'code', language: 'bash', body: 'curl -X POST http://localhost:8080/api/tasks \\\n  -H "Content-Type: application/json" \\\n  -d \'{"title":"学会启动 Spring Boot","description":"完成启动实验室","priority":"HIGH"}\'' },
          { type: 'text', body: 'JSON 先进入 CreateTaskRequest。@Valid 触发字段校验，通过后 Service 创建 Entity，Repository 保存，最后转换成 TaskResponse。' },
        ],
      },
      {
        title: '更新、完成、删除',
        blocks: [
          { type: 'code', language: 'bash', body: 'curl -X PUT http://localhost:8080/api/tasks/1 \\\n  -H "Content-Type: application/json" \\\n  -d \'{"title":"Java 启动实战","description":"已能运行服务","priority":"HIGH","completed":false}\'\n\ncurl -X PATCH http://localhost:8080/api/tasks/1/complete\ncurl -X DELETE http://localhost:8080/api/tasks/1' },
          { type: 'note', title: '为什么要分 DTO 和 Entity', body: 'Entity 描述数据库状态；Request DTO 描述客户端允许提交什么；Response DTO 描述公开给客户端什么。分开之后，数据库演进不会直接污染 API 合约。' },
        ],
      },
      {
        title: '让错误也有合同',
        blocks: [
          { type: 'code', language: 'bash', title: '故意发送非法请求', body: 'curl -i -X POST http://localhost:8080/api/tasks \\\n  -H "Content-Type: application/json" \\\n  -d \'{"title":"","priority":"HIGH"}\'' },
          { type: 'text', body: '你会得到 HTTP 400 和结构化字段错误。访问不存在的 id 则由 TaskNotFoundException 经 GlobalExceptionHandler 转成 HTTP 404。' },
          { type: 'check', title: '继续动手', items: ['给 Task 增加 dueDate', 'Priority 增加 URGENT', '新增 GET /api/tasks?completed=true 过滤', '为新行为补一条 MockMvc 测试'] },
        ],
      },
    ],
  },
  {
    slug: 'company-map', order: 6, shortTitle: '公司项目地图', title: '从 mini demo 走向多模块后端',
    eyebrow: 'STAGE 06 · MAP', duration: '25 分钟',
    summary: '把刚学会的单模块项目，映射到 console-portal 的 Java 8 / Spring Boot 2 多模块结构。',
    outcomes: ['知道从哪个模块找启动类', '能辨认公共、框架、系统和业务模块', '能区分存量栈与现代新项目选择'],
    sections: [
      {
        title: '结构映射',
        blocks: [
          { type: 'code', language: 'text', body: 'console-portal/                 根 pom，聚合模块\n├── console-admin/              启动类、Web 入口、application.yml\n├── console-common/             响应模型、工具、通用依赖\n├── console-framework/          Web、安全、数据源等框架配置\n├── console-system/             系统表相关能力\n├── console-publics/            小型业务集合\n└── console-*/                  其他业务模块' },
          { type: 'text', body: 'mini-backend 把这些职责先放在一个模块的不同 package 中。这样启动链路短、认知负担低；当团队和业务规模增长，再用 Maven module 强化依赖边界。' },
        ],
      },
      {
        title: '技术栈雷达',
        blocks: [
          { type: 'compare', left: { label: '公司存量项目', value: 'Java 8 · Spring Boot 2.3 · MyBatis-Plus · Knife4j' }, right: { label: '学习 demo', value: 'Java 21 · Spring Boot 3 · JPA · springdoc' } },
          { type: 'steps', items: ['MyBatis / MyBatis-Plus：显式 Mapper 与 SQL 控制更强；JPA：通过实体与 Repository 快速完成常规 CRUD。', 'Spring Security：认证和授权；mini demo 暂不引入，先学清 HTTP 与分层。', 'Redis：缓存或共享状态；不是所有接口都需要。', 'Apollo：集中配置管理；本地 demo 用 application.yml 足够。', 'Druid：数据源连接池与监控；Spring Boot 3 默认连接池已足够入门。', 'Knife4j / springdoc：都服务于 API 文档与调试，但适配的生态与版本不同。'] },
        ],
      },
      {
        title: '读大型项目的顺序',
        blocks: [
          { type: 'steps', items: ['先读根 pom 的 modules、Java 与 Spring Boot 版本。', '找到启动模块与 @SpringBootApplication。', '读 application.yml 的端口、context-path 和 profile。', '从一个 Controller 出发，只追一条 Service → Mapper 链路。', '最后再看 Security、数据源、Redis、Apollo 等横切配置。'] },
          { type: 'note', title: '版本提醒', body: 'Spring Boot 3 使用 jakarta.*，Spring Boot 2 常见 javax.*。读存量代码时要认识两套写法；写新 demo 时不要为了表面一致而降回旧版本。' },
          { type: 'check', title: '毕业标准', items: ['能指出 console-portal 的启动模块', '能解释单模块与多模块的取舍', '能沿一条 API 链路找到 Controller、Service、Mapper'] },
        ],
      },
    ],
  },
]

export const frontendJavaMap = [
  ['package.json', 'pom.xml'], ['npm run dev', './mvnw spring-boot:run'],
  ['npm run build', './mvnw clean package'], ['node_modules', '~/.m2/repository'],
  ['Express Router', '@RestController'], ['middleware', 'Filter / Interceptor'],
  ['.env', 'application.yml + Profile'], ['type / interface', 'record / DTO / interface'],
]
