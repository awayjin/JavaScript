# [布局概念] 关于CSS-BFC深入理解

## BFC是什么
> BFC概念: 块级格式化上下文（Block Formatting Context，BFC） 是Web页面的可视化CSS渲染的一部分，是块盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域

BFC概括：可以在心中记住这么一个概念———所谓的BFC就是css布局的一个概念，是一块区域，一个环境。

下列方式会创建块格式化上下文：
- 浮动元素（元素的 float 不是 none）

块级格式化上下文包含创建它的元素内部的所有内容.

创建 BFC
- 避免外边距折叠，overflow: auto;
- 避免外边距折叠，创建无副作用的BFC。 display: flow-root;
- 创建包含浮动的 overflow: auto;
