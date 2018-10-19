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
```html
save.jsp
<%
try {
	int money = 100;
	int number = 0;
	request.setAttribute("result", money * number);
} catch (Exception err) {
	request.setAttribute("result", "Sorry, The page happen a error.");
}
%>

<jsp:forward page="saveVarsDeal.jsp" />

----
saveVarsDeal.jsp

<%
String message = request.getAttribute("result").toString();
%>

<p>
<%=message %>
```

## 6.2.3 获取Cookie
> 通过cookie可以标识用户身份，记录用户名和密码，跟踪重户用户

## 6.3 response对象
> response对象用于响应客户请求，向客户端输出信息

### 6.3.1 重定向网页
> sendRedirect()方法

## 6.4 session对象
> HTTP协议是一种无状态协议,当一个客户向服务器发出请求，服务器接收请求，并返回响应后，该连接就结束了，而服务器并不保存相关的信息.
> Session会话保存用户状态，直到关闭浏览器.

## 6.5 application对象
> 用于保存所有应用程序中的公有数据