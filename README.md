# monorepo template

这是一个 monorepo 模板，用于快速创建一个 monorepo 项目。主要使用 pnpm、vite 来进行 monorepo 项目的管理。

# 主要解决的痛点：

- 用 alias 解决在开发模式启动 playground 时，不会自动编译 packages 的问题。
- 用 typescript config 的 paths、reference、include、baseUrl 等解决子包之间互相依赖
