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

## 亮点3: 路由改为懒加载
结合 Vue 的异步组件和 Webpack 的代码分割功能，轻松实现路由组件的懒加载
```
// 路由懒加载
component: () => import('./views/About.vue')
// 没有路由懒加载
component: About // import About from '../views/About.vue'
```

## 难点1: 编写服务端渲染(SSR)通用工程模板