Mac 
homebrew install nginx
/usr/local/etc/nginx

include servers/*; 新的站点创建新的配置文件。

$host 是用来区分我们实际要访问的哪个服务。

server_name 在浏览器访问的.

location /  所有的请求代理到哪个地方。

sudo -s 获得超级管理员权限。

server {
    listen          80
    server.name     test.com
    
    location / {
      proxy_pass    http://127.0.0.1:8888;
      proxy_set_header  Host $host;
    }
}