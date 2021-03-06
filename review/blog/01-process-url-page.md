# 从输入 URL 到页面加载完成的过程中都发生了什么

## 过程概述
 1. 浏览器查找域名对应的 IP 地址
 
 2. 浏览器根据 IP 地址与服务器建立 socket 连接
 
 3. 浏览器与服务器通信：浏览器请求，服务器处理请求
 
 4. 浏览器与服务器断开连接
 
 
 ## 根据域名查找 IP 地址
 
 概念解释
 - IP 地址
 - 域名(Domain Name)
 - DNS(域名系统): 作为将域名和IP地址相互映射的一个分布式数据库
 
 
 DNS解析
 
 TCP连接
 
 发送HTTP请求
 
 服务器处理请求并返回HTTP报文
 
 浏览器解析渲染页面
 
 连接结束
 
 ## 1. DNS 解析
 > DNS(域名系统): 作为将域名和IP地址相互映射的一个分布式数据库
 - DNS 解析是一个递归的过程
 
 #### DNS 优化- DNS 缓存
 >  DNS 存在着多级缓存， 从离浏览器的距离排序，以下：
  - 浏览器缓存
  - 系统缓存
  - 路由器缓存
  - IPS 服务器缓存
  - 根域名服务器缓存
  - 顶级域名服务器缓存
  - 主域名服务器缓存
  
 #### DNS 负载均衡
 > 可以根据每台机器的负载量，该机器离用户地理位置的距离等等，这种过程就是DNS负载均衡，又叫做DNS重定向
 
 
 ## 2. TCP 连接
 > HTTP 协议是基于 TCP 协议出现的，对 TCP 协议来说，TCP 协议是一条双向的通讯通道，
  
   HTTP 在 TCP 的基础上，规定了 Request-Response 的模式。这个模式决定了通讯必定是由浏览器端首先发起的。
   
#### HTTPS 协议
> HTTPS 有两个作用，一是确定请求的目标服务端身份，二是保证传输的数据不会被网络中间节点窃听或者篡改。

- HTTPS 是使用加密通道来传输 HTTP 的内容。但是 HTTPS 首先与服务端建立一条 TLS 加密通道。
- TLS 构建于 TCP 协议之上，它实际上是对传输的内容做一次加密，所以从传输内容上看，HTTPS 跟 HTTP 没有任何区别。

#### HTTPS 过程
> HTTPS在传输数据之前需要客户端与服务器进行一个握手(TLS/SSL握手)，在握手过程中将确立双方加密传输数据的密码信息。

## 3. HTTP 请求
## 4. 服务器处理请求并返回 HTTP 报文
## 5. 浏览器解析渲染页面