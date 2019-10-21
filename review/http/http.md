# 前端需要了解的 HTTP 协议

## 引言
> HTTP 协议（HyperText Transfer Protocol， 超文本传输协议). HTTP 协议是基于 TCP 协议出现的, 规定了 Request-Response 的模式。这个模式决定了通讯必定是由浏览器端首先发起的。

我们知道计算机之间的通信是通过 IP 来实现的, 域名只是让大家更好的记住.

当在客户端输入一个 URL, 经过 DNS 查询把 IP 返回给客户端, 客户端再拿这个 IP 请求真正的服务器.

!['dns-ip']('./dns-ip.png')

