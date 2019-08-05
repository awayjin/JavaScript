1.0 前言
一个浏览器到底是如何工作的？ 另一个问题:从输入 URL 到页面加载全过程

对浏览器实现者来讲，他们做的事情，如何把一个 URL 变成屏幕上显示的网页。
这个过程是这样的：
浏览器首先使用 HTTP 或 HTTPS 协议，向服务端请求页面
把请求回来的 HTML 代码经过解析，构建成 DOM 树
计算 DOM 树上的 CSS 属性
最后根据 CSS 属性对元素逐个进行渲染，得到内存中的位图
一个可选的步骤是对位图进行合成，这会极大的增加后续绘制的速度
合成之后，再绘制到界面上


建立一个感性认识。我们从 HTTP 请求回来开始，这个过程并非一般想象中的一步做完再做下一步，而是一条流水线。

从 HTTP 请求回来，就产生了流式的数据，后续的 DOM 树构建、CSS 计算、渲染、合成、绘制，
都是尽可能地流式处理前一步的产出：即不需要等到上一步骤完全结束，就开始处理上一步的输出，
这样我们在浏览网页时，才会看到逐步出现的页面。

2. HTTP 协议-网络通讯
浏览器首先要做的事就是根据 URL 把数据取回来，取回数据使用的是 HTTP 协议（实际上这个过程之前还有 DNS 查询）

HTTP 标准由 IETF 组织制定，跟它相关的标准主要有两份：
HTTP1.1 https://tools.ietf.org/html/rfc2616
HTTP1.1 https://tools.ietf.org/html/rfc7234

HTTP 协议是基于 TCP 协议出现的，对 TCP 协议来说，TCP 协议是一条双向的通讯通道，
HTTP 在 TCP 的基础上，规定了 Request-Response 的模式。这个模式决定了通讯必定是由浏览器端首先发起的。

HTTP 是纯粹的文本协议，它是规定了使用 TCP 协议来传输文本格式的一个应用层协议。

3. 实验
我们的实验需要使用 telnet 客户端，这个客户端是一个纯粹的 TCP 连接工具（安装方法）。
telnet time.geekbang.org 80

GET / HTTP/1.1
Host: time.geekbang.org


按下两次回车，我们收到了服务端的回复：
HTTP/1.1 301 Moved Permanently
Date: Fri, 25 Jan 2019 13:28:12 GMT
Content-Type: text/html
Content-Length: 182
Connection: keep-alive
Location: https://time.geekbang.org/
Strict-Transport-Security: max-age=15768000

<html>
<head><title>301 Moved Permanently</title></head>
<body bgcolor="white">
<center><h1>301 Moved Permanently</h1></center>
<hr><center>openresty</center>
</body>
</html>

这就是一次完整的 HTTP 请求的过程了，在 TCP 通道中传输的，完全是文本。

在请求部分，第一行被称作 request line，它分为三个部分，HTTP Method，也就是请求的“方法”，请求的路径和请求的协议和版本。
在响应部分，第一行被称作 response line，它也分为三个部分，协议和版本、状态码和状态文本。

紧随在 request line 或者 response line 之后，是请求头 / 响应头，这些头由若干行组成，每行是用冒号分隔的名称和值。
在头之后，以一个空行（两个换行符）为分隔，是请求体 / 响应体，请求体可能包含文件或者表单数据，响应体则是 html 代码。

4. 协议格式

path 是请求的路径完全由服务端来定义，而 version 几乎都是固定字符串；response body 是 HTML，

5. HTTP Method(方法)
request line 里面的方法部分。表示我们此次 HTTP 请求希望执行的操作类型。方法有以下几种定义：
GET 浏览器通过地址栏访问页面都是 GET 方法
POST 表单提交产生 POST 方法
HEAD HEAD 则是跟 GET 类似，只返回请求头，多数由 JavaScript 发起
PUT PUT 和 DELETE 分别表示添加资源和删除资源
DELETE
CONNECT 现在多用于 HTTPS 和 WebSocket
OPTIONS 一般用于调试，多数线上服务都不支持
TRACE

浏览器通过地址栏访问页面都是 GET 方法。表单提交产生 POST 方法。
HEAD 则是跟 GET 类似，只返回请求头，多数由 JavaScript 发起

PUT 和 DELETE 分别表示添加资源和删除资源，但是实际上这只是语义上的一种约定，并没有强约束。
CONNECT 现在多用于 HTTPS 和 WebSocket。

OPTIONS 和 TRACE 一般用于调试，多数线上服务都不支持。

6. HTTP Status code（状态码）和 Status text（状态文本）
 response line 的状态码和状态文本。常见的状态码有以下几种。
1xx：临时回应，表示客户端请继续。
2xx：请求成功。
200：请求成功。

3xx: 表示请求的目标有变化，希望客户端进一步处理。
301&302：永久性与临时性跳转。
304：跟客户端缓存没有更新。

4xx：客户端请求错误。
403：无权限。
404：表示请求的页面不存在。
418：It’s a teapot. 这是一个彩蛋，来自 ietf 的一个愚人节玩笑。（超文本咖啡壶控制协议）

5xx：服务端请求错误。
500：服务端错误。
503：服务端暂时性错误，可以一会再试。

304 又是一个每个前端必知必会的状态，产生这个状态的前提是：客户端本地已经有缓存的版本，
并且在 Request 中告诉了服务端，当服务端通过时间或者 tag，发现没有更新的时候，
就会返回一个不含 body 的 304 状态。

7. HTTP Head (HTTP 头)
HTTP 头可以看作一个键值对。原则上，HTTP 头也是一种数据，我们可以自由定义 HTTP 头和值。

在 HTTP 标准中，有完整的请求 / 响应头规定，这里我们挑几个重点的说一下：

request header:


Response Header

这里仅仅列出了比较常见的 HTTP 头，这些头是前端工程师应该做到不需要查阅，看到就可以知道意思的 HTTP 头。
完整的列表参考给出的 rfc2616 标准。

8.0 HTTP Request Body
HTTP 请求的 body 主要用于提交表单场景。实际上，http 请求的 body 是比较自由的，
只要浏览器端发送的 body 服务端认可就可以了。

application/json
application/x-www-form-urlencoded
multipart/form-data
text/xml

我们使用 html 的 form 标签提交产生的 html 请求，默认会产生 application/x-www-form-urlencoded 的数据格式，
当有文件上传时，则会使用 multipart/form-data。

9.0 HTTPS
在 HTTP 协议的基础上，HTTPS 和 HTTP2 规定了更复杂的内容，但是它基本保持了 HTTP 的设计思想，
即：使用上的 Request-Response 模式。

HTTPS 有两个作用，一是确定请求的目标服务端身份，二是保证传输的数据不会被网络中间节点窃听或者篡改。
HTTPS 的标准也是由 RFC 规定的，详情链接：
https://tools.ietf.org/html/rfc2818

HTTPS 是使用加密通道来传输 HTTP 的内容。但是 HTTPS 首先与服务端建立一条 TLS 加密通道。
TLS 构建于 TCP 协议之上，它实际上是对传输的内容做一次加密，所以从传输内容上看，HTTPS 跟 HTTP 没有任何区别。

10.0 HTTP 2
HTTP 2 是 HTTP 1.1 的升级版本，详情链接。
https://tools.ietf.org/html/rfc7540

HTTP 2.0 最大的改进有两点，一是支持服务端推送，二是支持 TCP 连接复用。

服务端推送能够在客户端发送第一个请求到服务端时，提前把一部分内容推送给客户端，放入缓存当中，
这可以避免客户端请求顺序带来的并行度不高，从而导致的性能问题。

TCP 连接复用，则使用同一个 TCP 连接来传输多个 HTTP 请求，避免了 TCP 连接建立时的三次握手开销，
和初建 TCP 连接时传输窗口小的问题。

Note: 其实很多优化涉及更下层的协议。IP 层的分包情况，和物理层的建连时间是需要被考虑的。

11.0 结语
学习了浏览器的第一步工作，也就是“浏览器首先使用 HTTP 协议或 HTTPS 协议，向服务端请求页面”的这一过程。

在这个过程中，掌握 HTTP 协议是重中之重。从一个小实验开始，带你体验了一次完整的 HTTP 请求过程。
我们一起先分析了 HTTP 协议的结构。

接下来，分别介绍了 HTTP 方法、HTTP 状态码和状态文本、HTTP Head 和 HTTP Request Body 几个重点需要注意的部分。

最后，我还介绍了 HTTPS 和 HTTP 2 这两个补充版本，以便更好地熟悉并理解新的特性。