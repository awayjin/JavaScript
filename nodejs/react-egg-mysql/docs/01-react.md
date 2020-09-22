## 在终端打开 VSCode
command + ctrl + p 安装 code 到 path 中.

## nvm - node多版本管理
windows 安装：
https://github.com/coreybutler/nvm-windows

常用命令
```
nvm list //查看目前已经安装的版本 
nvm list available //显示可下载版本的部分
nvm install 10.15.0 //安装指定的版本的nodejs nvm use 10.15.0 //使用指定版本
npm install -g cnpm --registry=https://registry.npm.taobao.org //使用淘宝镜
```

## 3. umi 相关
安装 脚手架： `yarn create umi`

创建页面： npx umi g page demo

### 3.1 嵌套路由
目录下创建 `_layout.tsx`，然后 `props.children`

### 3.2 动态路由
 umi 2: [id] 动态路由 创建 React 组件
 umi 3: $id 动态路由 创建 React 组件