# Koa2Skeleton

Koa2 Web API 脚手架（TypeScript）

Koa2 Web API skeleton (TypeScript)

![63d1e2eae9554aa](b4fw1200.webp)

## 简介 / Introduction

- 现代化的 Koa2 + TypeScript 项目模板，内置日志、数据库、路由与中间件。
- A modern Koa2 + TypeScript template with logging, database, routing, and middlewares.

## 特性 / Features

- TypeScript 项目结构与编译产物分离（`src` → `build`）
- Unified JSON 响应与错误处理中间件（`jsonMiddle`、`errorMiddle`）
- 健康检查路由：`GET /health`
- 环境变量管理：`dotenv`（默认端口 `3000`）
- MySQL（`sequelize` + `mysql2`）数据访问示例
- 模块化 `Logger`（`log4js`），无全局变量耦合
- 请求体解析（按需加载 `koa-bodyparser`）

- Clean TypeScript structure (`src` → `build`)
- Unified JSON response and error handling middlewares (`jsonMiddle`, `errorMiddle`)
- Health check route: `GET /health`
- Environment variables via `dotenv` (default port `3000`)
- MySQL access using `sequelize` + `mysql2`
- Modular `Logger` (`log4js`), avoiding global state
- Request body parsing (optional `koa-bodyparser`)

## 快速开始 / Quick Start

1. 安装依赖 / Install dependencies

   ```bash
   npm i
   ```

2. 配置环境变量 / Configure environment variables

   在项目根目录创建 `.env`（或使用现有文件）：

   Create `.env` at project root (or use existing):

   ```env
   WEB_PORT=3000
   DB_MYSQL_HOST=127.0.0.1
   DB_MYSQL_DBNAME=test
   DB_MYSQL_USER=root
   DB_MYSQL_PASSWORD=root
   ```

3. 编译与启动 / Build and start

   ```bash
   npm run build
   npm start
   ```

4. 健康检查 / Health check

   ```bash
   curl http://127.0.0.1:3000/health
   # {"code":200,"message":"ok","data":{"uptime":...}}
   ```

## 项目结构 / Project Structure

```text
src/
  app/
    controller/
      BaseController.ts
      demo.ts
    dao/
      adminUser.ts
    model/
      adminUser.ts
      x1.ts
    service/
      BaseService.ts
      DemoService.ts
  constants/
    index.ts
  router/
    index.ts
  utils/
    Database/
      index.ts
    Middleware/
      index.ts
      jsonMiddle.ts
      errorMiddle.ts
    Logger.ts
    String.ts
  server.ts
```

## 配置 / Configuration

- `WEB_PORT`：服务端口（默认 `3000`）
- `DB_MYSQL_HOST`：数据库主机
- `DB_MYSQL_DBNAME`：数据库名称
- `DB_MYSQL_USER`：数据库用户
- `DB_MYSQL_PASSWORD`：数据库密码

- `WEB_PORT`: server port (default `3000`)
- `DB_MYSQL_HOST`: database host
- `DB_MYSQL_DBNAME`: database name
- `DB_MYSQL_USER`: database user
- `DB_MYSQL_PASSWORD`: database password

## NPM 脚本 / NPM Scripts

- `npm run build`：编译 TypeScript 到 `build/`
- `npm start`：启动编译后的服务

- `npm run build`: compile TypeScript to `build/`
- `npm start`: start the compiled server

## API 示例 / API Examples

- `GET /health`

  ```json
  { "code": 200, "message": "ok", "data": { "uptime": 123.45 } }
  ```

- `GET /?id=1`（示例，依赖数据库数据） / sample, depends on DB

  ```json
  { "code": 200, "message": "获取成功", "data": { /* user */ } }
  ```

- `GET /demo?page=1&size=5`

  ```json
  {
    "code": 200,
    "message": "获取成功",
    "data": {
      "list": [],
      "count": 0,
      "pageIndex": 1,
      "pageSize": 5,
      "totalPages": 0
    }
  }
  ```

## 架构要点 / Architecture Notes

- 无全局 Logger，模块化导入使用；更易测试与复用。
- 数据库在启动阶段显式初始化（`initDatabase()`），失败时优雅退出。
- 控制器通过构造注入接收服务实例，降低模块间耦合。
- 统一 JSON 响应与错误处理，提升一致性与可观测性。

- No global logger; use modular imports for better testability.
- Database is explicitly initialized at startup (`initDatabase()`), graceful failure.
- Controllers receive service instances via constructor injection, reducing coupling.
- Unified JSON response and error handling promotes consistency and observability.

## 许可证 / License

本项目遵循仓库内的 `LICENSE`。

This project follows the `LICENSE` included in the repository.

