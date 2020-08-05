## 如何用JS实现hash路由

hash的特点:
- hash变化触发网页跳转，即浏览器的前进和后退
- hash变化不需要刷新页面, SPA 必需的特点
- hash不会提交到 server 端

```html
<button id="changeHashBtn">change hash</button>
<button id="helloHashBtn">hello hash</button>
<script >
window.onhashchange = function (event) {
  console.log('event:', event)
  console.log('oldURL:', event.oldURL)
  console.log('newURL:', event.newURL)
  console.log('location:', location.hash)
}
  document.getElementById('changeHashBtn').addEventListener('click', () => {
    location.hash = '#change'
  })
  document.getElementById('helloHashBtn').addEventListener('click', () => {
    location.hash = '#hello'
  })
</script>
```

## JS 实现 history路由
- 用url规范的路由且页面跳转不刷新页面
- history.pushState 和 window.onpopstate

如何区分前端后端路由

## vue-router 钩子函数
- 全局的：beforeEach、beforeResolve、afterEach
- 路由的：beforeEnter. 路由独享的守卫
- 组件的：beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave

导航守卫:
> 全局前置守卫 beforeEach

> 全局解析守卫 beforeResolve

这和 router.beforeEach 类似，区别是在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用

>> 全局后置钩子 beforeResolve


## 参考
vue router钩子函数： https://zhuanlan.zhihu.com/p/70536937
前端路由原理： https://www.cnblogs.com/-constructor/p/12819098.html