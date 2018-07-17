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
> 声明该页面中所使用的标签库，同时引用标签库，并指定标签的前缀
- prefix: 用于指定标签的前缀。不能命名为jsp、jspx、java、javax、sun、servelet、sunw
- uri: 用于指定标签库文件的存放位置
```html
<%@ taglib prefix="tagPrefix" uri="tagURI" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
```

## 5.3 脚本标识
> JSP中的脚本标识3部分：JSP表达式(expression)、声明标识(Declaration)和脚本程序(Scriptlet)

### 5.3.1 JSP表达式
> JSP表达式用于向页面中输出信息，语法格式 <%= 表达式 %>
> 表达式： 可以是任何Java语言的完整表达式，最终运算结果将被转换为字符串
```html
<%
String manager = "manager";
char ch = 'A';
%>
<p>管理员：<%= manager %></p>
<p>字符：<%= ch %></p>
```

### 5.3.2 声明标识
> 声明标识用于在JSP页面中定义全局的变量或方法
> 服务器执行JSP页面时，转换为Servlet类，会把JSP声明标识定义的变量和方法转换为类的成员变量和方法
```html
<%! -- %>
<section>
<%!
// !声明标识
int number = 300;
int count () {
  number++;
  return number;
}
%>
调用声明的全局方法, number： <%= count() %>
</section>
```

### 5.3.3 代码片段
> 所谓代码片段就是在JSP页面中嵌入Java代码或脚本代码
```html
<% Java代码或脚本代码 %>
```

## 5.5 动作标识
### 5.5.1 包含文件标识<jsp:include>
> 动作标识<jsp:include>用于当前页面中包含其他的文件
```html
<jsp:include page="url" flush="false|true" >
  子动作标识<jsp:param>
</jsp:include>
```

###  include指令与与<jsp:include>动作标识的区别
- include指令通过file属性指定包含的文件，file不支持任何表达式.<jsp:include>的page属性支持JSP表达式
- include指令被包含的文件原封不动插入到包含页中。<jsp:include>包含文件时，当该标识被执行时，程序会将请求转发到被包含的页面
- include指令包含文件时，不能重名的变量和方法，<jsp:include>是单独编译的，被包含文件和包含文件是不相冲突的

### 5.5.2 请求转发标识<jsp:forward>