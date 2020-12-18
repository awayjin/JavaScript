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

## httpClient
请求别的服务。

此框架基于 urllib 内置实现了一个 HttpClient，应用可以非常便捷地完成任何 HTTP 请求

## 中间件
`app/middleware`

Egg 和 Koa 的中间件形式是一样的，都是基于洋葱模型(the onion model)。

中间件的定位是拦截用户请求，并在它前后做一些事情，例如：鉴权、安全检查、访问日志等等。但实际情况是，有些功能是和请求无关的，例如：定时任务、消息订阅、后台逻辑等等。

## 框架扩展
`app/extend`
- app/extend/application.js 全局应用对象
- context.js Context 和 ctx 都是指 Koa 的上下文对象
- Request 对象和 Koa 的 Request 对象相同，是 请求级别 的对象
- Helper 函数用来提供一些实用的 utility 函数。

## 插件
- Egg.js 插件其实就是一个『迷你的应用』，和应用（app）几乎一样
- 中间件的定位是拦截用户请求, 而插件可以处理业务逻辑
- 插件没有独立的 Router 和 Controller

## 定时任务
- 定时上报应用状态, 便于系统监控。
- 定时从远程接口更新本地缓存。
- 定时进行文件切割(清除过期日志文件)、临时文件删除。


## mysql 
安装 MySQL Community Server

可视化工具： MySQL Workbench 

## Web 安全概念
Web 应用中存在很多安全风险，这些风险会被黑客利用，轻则篡改网页内容，重则窃取网站内部数据，更为严重的则是在网页中植入恶意代码，使得用户受到侵害。常见的安全漏洞如下：

- CSRF 攻击：伪造用户请求向网站发起恶意请求。

### 安全威胁 CSRF 的防范




