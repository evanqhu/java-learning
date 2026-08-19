# Java Field Guide

给前端开发者的 Java 后端快速上手项目。它由两个部分组成：

- 根目录：React + TypeScript + Vite 学习网站
- [`mini-backend`](./mini-backend)：JDK 21 + Spring Boot 3 Todo API

## 先启动学习网站

本机需要 Node.js 20 或更高版本。

当前项目通过本地 `.npmrc` 使用淘宝 npm 镜像，不会修改你的全局 npm registry。

```bash
cd /Users/evanqhu/code/java-learning
npm install
npm run dev
```

打开 <http://localhost:5173>。第一次建议从“环境安装”开始；如果已经装好 JDK 21，可以直接进入“启动实验室”。

其他前端命令：

```bash
npm run lint
npm run build
npm run preview
```

## 再启动 Todo 后端

先确认：

```bash
java -version
javac -version
```

两条命令都应显示 JDK 21。然后执行：

```bash
cd /Users/evanqhu/code/java-learning/mini-backend
chmod +x mvnw
./mvnw spring-boot:run
```

主要地址：

- API：<http://localhost:8080/api/tasks>
- Health：<http://localhost:8080/api/health>
- Swagger UI：<http://localhost:8080/swagger-ui.html>
- H2 Console：<http://localhost:8080/h2-console>

后端的完整命令、接口和目录说明见 [`mini-backend/README.md`](./mini-backend/README.md)。

## 推荐路线

1. macOS 安装 JDK 21
2. 用命令行启动 Spring Boot
3. 调用 health 与 Todo API
4. 沿 Controller → Service → Repository 阅读代码
5. 完成 Todo CRUD 小练习
6. 对照公司 Java 8 / Spring Boot 2 多模块项目

学习进度和主题设置保存在浏览器 `localStorage`，不会上传。

## 技术选择

学习 demo 有意保持单模块、H2、无认证，以降低第一次启动成本。参考项目中的多模块、MyBatis-Plus、Redis、Apollo、Spring Security 等内容只在“公司项目地图”中解释，不作为本地启动前提。
