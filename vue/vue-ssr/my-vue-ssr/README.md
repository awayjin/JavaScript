# 基于 vue-cli 3.x+ ServerSide-Renderer服务端渲染(SSR)

服务器渲染也可认为"同构"或"通用

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run dev
```
http://localhost:3000 是客户端和服务端实时编译的.

http://localhost:5001 是客户端开发

### Compiles and minifies for production
```
yarn run build
```

### 生产长期运行
要先构建 `yarn run build`, 再运行 `yarn run ssr`
```
yarn run ssr 
```
http://localhost:3002

### Lints and fixes files
```
yarn run lint
```

