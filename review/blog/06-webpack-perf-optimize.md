# webpack 打包分析与性能优化

## 项目背景

项目技术栈使用 Vue-cli 2.x 搭建的全家桶


## webpack 打包分析
- 1.打包过程分析
- 2.如何定位webpack打包速度慢的原因

终端输入：
```html
// 假如没有指定配置文件，会在当前目录寻找webpack.config.js 作为配置文件
webpack --profile --json > stats.json


// 实际执行的
node_modules/.bin/webpack --config ./build/webpack.dev.conf.js --profile --json > stats.json
```
将输出的json文件到如下两个网站进行分析

https://github.com/webpack/analyse
http://alexkuz.github.io/webpack-chart/



