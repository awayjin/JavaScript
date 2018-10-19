---
layout: post
title:  "代理与反射接口"
date:   2018年09月17日 09:56:32
categories: JavaScript
excerpt: 像JS引擎那样做
---

* content
{:toc}

---

> 语言通过代理(proxy)暴露了在对象上的内部工作,代理是一种封装，能够拦截并改变JS引擎的底层操作

> 数组的问题-the Array problem

> 12.2 代理与反射是什么
> 调用new Proxy(),创建一个代理用来替代另一个对象(目标).代理对目标对象进行了虚拟
> 代理允许你拦截在目标对象上的底层操作.拦截行为使用了一个能够响应特定操作的函数(被称为陷阱)