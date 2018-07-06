---
layout: post
title:  "JSP基本语法"
date:   2018年07月06日 11:38:32
categories: JSP基本语法
excerpt: JSP基本语法
---

* content
{:toc}

---

## 5.2 指令标识
> 语法格式 <% 指令名 属性1="属性值1" %>
```html
<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ page import="java.util.Date" %>
<%@ page import="java.text.SimpleDateFormat" %>
```
- 指令名： 用于指定指令名称，在JSP中包含page、include和taglib
- 属性: 用于指定属性名称，可设置多个属性
- 属性值：用于指定属性值
- 注意：指令标识的 "<%@" 和 "%>"是完整的标记

### 5.2.1 page指令
- page常用指令，用于定义整个JSP页面的相关属性，被解析成Servlet时会转换为相应的Java程序代码
> age指令属性有10个
- language="java"
- extends属性，用于设置页面继承的Java类
- import属性，用于设置JSP导入的类包
- pageEncoding属性，页面的编码格式
- contentType属性，用于设置JSP页面的MIME类型和字符编码
- session属性，JSP页面是否使用HTTP的session会话对象，属性值是boolean类型，默认为true
- buffer属性，设置JSP的out输出对象使用的缓冲区大小，默认8KB,buffer="128kb"
- isErrorPage属性，可以将当前JSP页面设置成错误处理页面，isErrorPage="true"
- errorPage属性，用于指定当前JSP页面异常错误的另一个JSP页面，指定的JSP错误处理页面必须设置isErrorPage属性为true.errorPage="error/loginErrorPage.jsp"

### 5.2.2 include指令
> 通过该指令可以在一个JSP页面中包含另一个JSP页面
```jsp
<% include file="path" %> // 只有一个file属性
```

### 5.2.3 taglib指令
> 声明该页面中所使用的标签库，同是引用标签库，并指定标签的前缀
```jsp
<%@ taglib prefix="tagPrefix" uri="tagURI" %>
```