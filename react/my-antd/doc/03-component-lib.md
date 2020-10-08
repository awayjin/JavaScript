# 完成一个组件库需要考虑的问题
- 代码结构
- 样式解决方案
- 组件需求分析和编码
- 组件测试用例分析和编码
- 代码打包输出和发布
- CI/CD, 文档生成等

## 1.0 代码结构

## 2.0 样式解决方案
- inline css
- CSS-in-JS
- Styled Component
- Sass/Less

官方： https://zh-hans.reactjs.org/docs/faq-styling.html#how-do-i-add-css-classes-to-components

### 2.1 样式系统文件结构
```
styles/
 _variables.scss 各种变量以及可配置设置
 _mixins.scss 全局 mixins
 _functions.scss 全局 funcitons
components/
 Button/
    style.scss 组件单独的样式
```

### 2.2 @mixin 与 @include
@mixin 指令允许我们定义一个可以在整个样式表中重复使用的样式。

@include 指令可以将混入（mixin）引入到文档中。

## 2.3 色彩体系
系统色板： 基础色板 + 中性色板

中性色板： 品牌色 + 功能色板

本组件库的色彩体系：

yarn add node-sass

$white:    #fff !default;

!default 可以轻松定义变量值。
!default 该变量如果已经赋值，那么它不会被重新赋值，但是，如果它尚未赋值，那么它会被赋予新的给定值

中国色： http://zhongguose.com/

## 3.0 更多样式变量 - 添加字体变量解决方案

### 组件库样式变量分类
- 基础色彩系统
- 字体系统
- 表单
- 按钮
- 边框和阴影
- 可配置开关

```
// 中性色板
$white:    #fff !default;
$gray-100: #f8f9fa !default;
$gray-200: #e9ecef !default;
$gray-300: #dee2e6 !default;
$gray-400: #ced4da !default;
$gray-500: #adb5bd !default;
$gray-600: #6c757d !default;
$gray-700: #495057 !default;
$gray-800: #343a40 !default;
$gray-900: #212529 !default;
$black:    #000 !default;
```

## 添加 normalize.css
Normalize.css 能干什么：

- 保留有用的默认值，不同于许多 CSS 的重置
- 标准化的样式，适用范围广的元素。
- 纠正错误和常见的浏览器的不一致性。
- 一些细微的改进，提高了易用性。
- 使用详细的注释来解释代码。

## Button 组件需求分析
- 不同的 Button Type 类型
  - Primary 
  - Default
  - Danger
  - Link Button
  
- 不同的 Button Size 大小
  - Normal
  - Small
  - Large
  
- Disabled 状态
  - Disabled
  - Link Button  
  
## 小试牛刀 - Button 组件编码 第一部分
classnames: https://github.com/JedWatson/classnames