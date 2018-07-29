---
layout: post
title:  "JSP基本语法"
date:   2018年07月25日 11:38:32
categories: JSP内置对象
excerpt: JSP内置对象
---

* content
{:toc}

---

# 6.2 request对象
> 封装由客户端生成的HTTP请求的所有细节. HTTP头信息、系统信息、请求方式和请求参数
## 6.6.1 访问请求参数
```html
<a href="deal.jsp?id=23&user">获取请求参数</a>
<%
String id = request.getParameter("id");
String user = request.getParameter("user");
String pwd = request.getParameter("pwd");
<p>
 id参数的值为： <%=id %>
</p>
<p>
 user参数的值为： <%=user %>
</p>
<p>
 pwd参数的值为： <%=pwd %>
</p>
%>
```
## 6.6.2 在作用域中管理属性