## Egg.js 是什么
Egg.js 为企业级框架和应用而生，帮助开发团队和开发人员降低开发和维护成本。

## 企业级应用的特点
- 功能完善
- 规范性高
- 便于扩展、升级

## egg.js 的特点
- 提供基于 Egg 定制上层框架的能力
- 高度可扩展的插件机制
- 内置多进程管理
- 基于 Koa 开发，性能优异
- 框架稳定，测试覆盖率高
- 渐进式开发

## egg与express/koa 对比
MVC 三层架构，
- controller 控制层，业务方面的代码
- service 服务层，数据库方面的操作
- view 视图层，前端页面相关展示

## 创建项目
yarn create egg --type=simple
npm init egg --type=simple

## 目录
- app/controller/** 用于解析用户的输入，处理后返回相应的结果
- config/config.{env}.js 用于编写配置文件
- config/plugin.js 用于配置需要加载的插件
- app/service/** 用于编写业务逻辑层，可选

## Web 安全概念
Web 应用中存在很多安全风险，这些风险会被黑客利用，轻则篡改网页内容，重则窃取网站内部数据，更为严重的则是在网页中植入恶意代码，使得用户受到侵害。常见的安全漏洞如下：

- CSRF 攻击：伪造用户请求向网站发起恶意请求。

### 安全威胁 CSRF 的防范



