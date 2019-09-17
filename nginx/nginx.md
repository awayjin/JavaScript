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

