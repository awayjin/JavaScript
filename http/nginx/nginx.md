nginx在应用程序中的作用
- 解决跨域
- 请求过滤
- 配置gzip
- 负载均衡
- 静态资源服务器

> nginx是一个高性能的HTTP和反向代理服务器，也是一个通用的TCP/UDP代理服务器

## 正向代理与反向代理

正向代理是为我们服务的，即为客户端服务的，客户端可以根据正向代理访问到它本身无法访问到的服务器资源。

反向代理是为服务端服务的，反向代理可以帮助服务器接收来自客户端的请求，帮助服务器做`请求转发`，`负载均衡`等


- main:nginx的全局配置，对全局生效。
- events:配置影响nginx服务器或与用户的网络连接。
- http：可以嵌套多个server，配置代理，缓存，日志定义等绝大多数功能和第三方模块的配置。
- server：配置虚拟主机的相关参数，一个http中可以有多个server。
- location：配置请求的路由，以及各种页面的处理情况。
- upstream：配置后端服务器具体地址，负载均衡配置不可或缺的部分

## 安装

Mac 下:
https://www.cnblogs.com/lping/p/5893567.html

*
```html
启动nginx
nginx

关闭nginx
nginx -s stop

重启
nginx -s reload

/usr/local/etc/nginx/nginx.conf （配置文件路径）

/usr/local/var/www （服务器默认路径）

/usr/local/Cellar/nginx/1.8.0 （安装路径）



查询 nginx 进程
ps -ef|grep nginx

 正常停止   sudo kill -QUIT 主进程号

```


## 45 | 架构优化：动静分离
- 静态内容
  - 基本不会变动，也不会因为请求参数不同而变化
  - -> CDN 分发，HTTP 缓存 等
  
- 动态内容
  - 各种因为请求参数不同而变动，且变种的数量几乎不可枚举
  - -> 用大量的源站机器承载，结合反向代理进行负载均衡
  
- Nginx 的静态服务能力和 Node.js 对比

- Nginx 配置反向代理的方法

查看端口占用情况:
netstat -nlp | grep 80

nginx 默认位置:
vi /etc/nginx/nginx.conf

压力测试工具 apache bench 在 linux 下的安装:
yum install httpd-tools


## 架构优化:反向代理与缓存服务

域名配置添加A记录，解析

- pm2 开启进程
```js
// m2 start index3003.js 启动
http = require('http');
http.createServer((req, res) => {
  res.end('3003/' + req.url)
}).listen(3003)
```

- nginx 配置
(\d*) 正则表达式, 前端匹配到的$1
```
location ~ /node/(\d*) {
    #proxy_pass http://localhost:3002/detail?columnid=$1
    proxy_pass http://node.com/detail?columnid=$1
    # proxy_cache 开启缓存
}
```

负载均衡:
```
upstream node.com {
    server 127.0.0.1:3002;
    server 127.0.0.1:3003;
}

```

nginx -s reload

访问： http://upstream.codegoing.com/node/44

- redis 来缓存 Node.js 方面的东西.

nginx alias与root的区别
http://www.siguoya.name/pc/home/article/260
