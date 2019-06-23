# 理解 MVVM
本文包含内容
- 什么是 MVVM

### 什么是 MVVM
> MVVM 是一种软件架构模式。MVVM 的核心是视图模型(ViewModel),它是一个值转换器(Value Converter),用来从模型(Model)中转换数据对象，从而使数据更易管理和呈现。该层向上与视图层(View)进行双向数据绑定，向下与模型层(Model)通过接口进行数据交互，起呈上启下的作用

### 组成
View: 视图，HTML、CSS、Template模板文件

ViewModel: 视图模型，JavaScript、Runtime、Compiler

Model: 模型，业务逻辑处理 MySQL等


### MVVM 分层设计的软件架构

**View 层**

View 是视图层，也就是用户界面。前端主要由 HTML 和 CSS 来构建，为了更方便地展现 ViewModel 或者 Model 层的数据，已经产生了各种各样的前后端模板语言

**Model 层**

Model 是指数据模型，泛指后端进行的各种业务逻辑处理和数据操控，主要围绕数据库系统展开。

**ViewModel 层**
二次封装，视图状态和行为，解耦

ViewModel 是由前端开发人员组织生成和维护的**视图数据层**。

在这一层，前端开发者对从后端获取的 Model 数据进行转换处理，做二次封装，以生成符合 View 层使用预期的视图数据模型。

需要注意的是 ViewModel 所封装出来的数据模型包括视图的状态和行为两部分，而 Model 层的数据模型是只包含状态的，展示都属于视图状态，事件属于视图行为（交互）。

由于实现了双向绑定，ViewModel 的内容会实时展现在 View 层，更新数据视图就会自动得到相应更新，真正实现数据驱动开发。View 层展现的不是 Model 层的数据，而是 ViewModel 的数据，由 ViewModel 负责与 Model 层交互，这就完全解耦了 View 层和 Model 层。


### 例子
Vue 的 View 模板：
```html
<div id="app">
    <p>{{message}}</p>
    <button v-on:click="showMessage()">Click me</button>
</div>
```

Vue 的 ViewModel 层（下面是伪代码）：
```javascript
var app = new Vue({
    el: '#app',
    data: {     // 用于描述视图状态（有基于 Model 层数据定义的，也有纯前端定义）
        message: 'Hello Vue!',  // 纯前端定义
        server: {}, // 存放基于 Model 层数据的二次封装数据
    },
    methods: {  // 用于描述视图行为（完全前端定义）
        showMessage(){
            let vm = this;
            alert(vm.message);
        }
    },
    created(){
        let vm = this;

        // Ajax 获取 Model 层的数据
        ajax({
            url: '/your/server/data/api',
            success(res){
                // TODO 对获取到的 Model 数据进行转换处理，做二次封装
                vm.server = res;
            }
        });
    }
})
 
```

服务端的 Model 层
```
{
    "url": "/your/server/data/api",
    "res": {
        "success": true,
        "name": "IoveC",
        "domain": "www.cnblogs.com"
    }
}
 
```

#### 参考文章
[维基百科MVVM](https://zh.wikipedia.org/wiki/MVVM)

[前后端分手大师](https://www.cnblogs.com/iovec/p/7840228.html)

[Vue.js 和 MVVM 小细节](https://www.cnblogs.com/onepixel/p/6034307.html)
