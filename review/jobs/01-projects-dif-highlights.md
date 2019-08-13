# 项目中的难点和亮点,做过什么项目优化

## 亮点1: 推进并落地前端团队编码规范
![编码规范](https://awayjin.github.io/codeguide/)

## 亮点2: 配置二级域名下每个静态文件接路径
```
server {
        listen       6003;
        server_name  localhost;
		
		location /jobapply {
            alias   jobapply;
			try_files $uri $uri/ /jobapply/index.html;
            index  index.html index.htm;
        }
		
		location /jobapply/jobapply/api/ {
            proxy_pass https://fancy-test.4009515151.com/jobapply/jobapply/api/;
        }
	
    }
```

## 难点1: 编写服务端渲染(SSR)通用工程模板