> 生命周期官方图示

[生命周期图示](https://cn.vuejs.org/images/lifecycle.png)
![生命周期图示](https://cn.vuejs.org/images/lifecycle.png "生命周期各阶段执行情况")


# 生命周期
> 概念:

## 生命周期构子函数
> 生命周期其实就是在源码的某个时间点执行了 callHook 方法。在此方法里通过 vm.$options[hook] 来执行生命周期钩子函数。

```javascript
  // vue/src/core/instance/lifecycle.js
  export function callHook (vm: Component, hook: string) {
    const handlers = vm.$options[hook] // 获取Vue选项中的生命周期钩子函数
    if (handlers) {
      for (let i = 0, j = handlers.length; i < j; i++) {
       handlers[i].call(vm) // 执行生命周期函数
      }
    }
  }
  // 例如触发created钩子的方法：callHook(vm, 'created')
```

生命周期构子|组件状态|最佳实践
--|:--:|--:
beforeCreate|实例初始化之后立即调用，在数据观测和event/watcher配置之前|常用于初始化非响应式变量
created|--|22

## new Vue() 创建 Vue 对象实例, 构造函数的形式创建
```javascript
// vue/src/core/instance/index.js
function Vue (options) {
  this._init(options) // 初始化各个功能
}
```

### this._init()
```javascript
 // vue/src/core/instance/init.js
 Vue.prototype._init = function (options?: Object) {
    initLifecycle(vm) // 初始化生命周期
    initEvents(vm) // 初始化事件
    initRender(vm) //  初始化渲染
    
    callHook(vm, 'beforeCreate') // 触发beforeCreate钩子
    
    // resolve injections before data/props  在 data/props 之前解析注入(inject)
    initInjections(vm) //(初始化 Inject) 
    initState(vm) // 初始化数据
    // resolve provide after data/props  在 data/props 之后解析装备(provide) 
    initProvide(vm) // 初始化 Provide
    
    callHook(vm, 'created') // 触发created钩子

    if (vm.$options.el) { // 判断是否有el选项,如果有则执行$mount方法
      vm.$mount(vm.$options.el)
    }
  }

```