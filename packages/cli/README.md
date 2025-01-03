# 🌌星空脚手架

## 包含的内容
对 vite 的封装，会将常用的 plugin 和 monorepo 的 alias 封装在一起，期望达到项目 0 配置运行。

功能：
- [x] dev (site)
- [x] build (site)
- [x] build (lib)
- [ ] lint
- [ ] release
- [ ] test

对于非源码引用方式的包，可以在 package.json 中添加 buildOptions 来跳过 alias 的配置，例如：
```json
{
  "buildOptions": {
    "isLib": true
  }
}
```
