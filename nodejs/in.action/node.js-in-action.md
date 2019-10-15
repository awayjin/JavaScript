## Node Web 程序
- package.json
- public
- node_modules/
- 放程序代码的一个或多个 JavaScript 文件.
    程序代码又分几块:
    - app.js 或 index.js
    - models/ 数据库模型
    - views/ 用来渲染页面的模板
    - controllers/ 或 routes/ - HTTP 请求处理
    - middleware/ 中间件组件
    
## 搭建一个 RESTful Web 服务

对应路由:
- POST /articles——创建新文章；
- GET /articles/:id——获取指定文章；
- GET /articles——获取所有文章；
- DELETE /articles/:id——删除指定文章。

用 cURL 向示例程序发起请求.