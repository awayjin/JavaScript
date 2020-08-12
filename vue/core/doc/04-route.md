## 如何区分前端后端路由
- 后端路由：

后端路由又可称之为服务器端路由。针对不同的路由(URL)对应不同的回调(映射)函数处理(req, res, next)。浏览器每次变化 URL 都要向服务器发送请求。

优点：安全性好、利于seo

缺点：加大服务器压力，对用户体验不好，代码耦合大

- 前端路由

定义：在单页面应用中，变成了组件化，进入不同页面就是切换不同的组件。
前端路由的目的就是完成组件切换而不需要向后端发起请求。
前端路由将url映射成了组件，通过 hash 或 history 来实现。

优点：用户体验好、切换跳转快。前后端分离加快开发速度。

缺点：SEO差，首屏加载慢。前进后退会重新发送请求，没有合理利用缓存资源。


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
- history.pushState 和 window.onpopstate.

pushState 和 replaceState 的区别， 前者 history.length 加 1, 后者不会。pushState是压入浏览器的会话历史栈中，replaceState是替换当前的会话历史。

调用history.pushState()或者history.replaceState()不会触发popstate事件. popstate事件只会在浏览器某些行为下触发, 比如点击后退、前进按钮(或者在JavaScript中调用history.back()、history.forward()、history.go()方法)，此外，a 标签的`锚点`也会触发该事件.

- 刷新的时候需要服务端支持
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```
```node
const http = require('http')
const fs = require('fs')
const server = http.createServer((req, res) => {
  const html = fs.readFileSync('./index.html', 'utf-8')
  res.end(html)
})
server.listen(8001)
```
## replaceState和pushState行为的监听
history.replaceState 和 history.pushState 不会触发popstate事件, 那么如何监听？

可以通过在方法里面主动的去触发popState事件。另一种就是在方法中创建一个新的全局事件。

```javascript
// 创建全局事件
function eventDispatch (type) {
  const _hr = history[type]
  return function () {
    const eve = new Event(type)
    window.dispatchEvent(eve)
    _hr.apply(this, arguments)
  }
}
// 重写方法
history.pushState = eventDispatch('pushState')
history.replaceState = eventDispatch('replaceState')
// 实现监听
window.addEventListener('pushState', (e) => {
  console.log('pushState listener', e)
})
window.addEventListener('replaceState', (e) => {
  console.log('replaceState listener', e)
})
```

## vue-router 钩子函数
- 全局的：beforeEach、beforeResolve、afterEach
- 路由的：beforeEnter. 路由独享的守卫
- 组件的：beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave

导航守卫:
> 全局前置守卫 beforeEach

> 全局解析守卫 beforeResolve

这和 router.beforeEach 类似，区别是在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用

> 全局后置钩子 beforeResolve

### Vue 完整的导航解析流程
1. 导航被触发。

2. 在失活的组件里调用 `beforeRouteLeave` 守卫。

3. 调用全局的 `beforeEach` 守卫。

4. 在重用的组件里调用 `beforeRouteUpdate` 守卫 (2.2+)。

5. 在路由配置里调用 `beforeEnter`。

6. 解析异步路由组件。

7. 在被激活的组件里调用 `beforeRouteEnter`。

8. 调用全局的 `beforeResolve` 守卫 (2.5+)。

9. 导航被确认。

10. 调用全局的 `afterEach` 钩子。

11. 触发 DOM 更新。

12. 调用 `beforeRouteEnter` 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。

## 参考
vue router钩子函数： https://zhuanlan.zhihu.com/p/70536937

前端路由原理： https://www.cnblogs.com/-constructor/p/12819098.html

需要 server 端配合，可参考
// https://router.vuejs.org/zh/guide/essentials/history-mode.html#%E5%90%8E%E7%AB%AF%E9%85%8D%E7%BD%AE%E4%BE%8B%E5%AD%90

如何监听URL的变化：
https://juejin.im/post/6844903749421367303

How to get notified about changes of the history via history.pushState?:
https://stackoverflow.com/questions/4570093/how-to-get-notified-about-changes-of-the-history-via-history-pushstate