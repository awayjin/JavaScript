# 完成一个组件库需要考虑的问题
- 代码结构
- 样式解决方案
- 组件需求分析和编码
- 组件测试用例分析和编码
- 代码打包输出和发布
- CI/CD, 文档生成等


## 样式解决方案
- inline css
- CSS-in-JS
- Styled Component
- Sass/Less

样式系统文件结构
```
styles/
 _variables.scss 各种变量以及可配置设置
 _mixins.scss 全局 mixins
 _functions.scss 全局 funcitons
components/
 Button/
    style.scss 组件单独的样式
```

## 色彩体系
系统色板： 基础色板 + 中性色板

中性色板： 品牌色 + 功能色板

本组件库的色彩体系：

yarn add node-sass

$white:    #fff !default;

!default 可以轻松定义变量值。
!default 该变量如果已经赋值，那么它不会被重新赋值，但是，如果它尚未赋值，那么它会被赋予新的给定值

中国色： http://zhongguose.com/