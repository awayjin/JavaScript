# Nuxt 服务端渲染

## 路由
pages

## 中间件
> 中间件允许您定义一个自定义函数运行在一个页面或一组页面渲染之前。

每一个中间件应放置在 `middleware/` 目录. 文件名的名称将成为中间件名称(middleware/auth.js将成为 auth 中间件)。

## 视图
本章节的内容阐述了如何在 Nuxt.js 应用中为指定的路由配置数据和视图，包括应用模板、页面、布局和HTML头部等内容。


## 布局
Nuxt.js 允许你扩展默认的布局，或在 layout 目录下创建自定义的布局

#### 自定义布局

## eslint
修复
```
"lint": "eslint --ext .js,.vue --ignore-path .gitignore .",
    "lintfix": "eslint --fix --ext .js,.vue --ignore-path .gitignore .",
```
