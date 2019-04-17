> 生命周期官方图示

[生命周期图示](https://cn.vuejs.org/images/lifecycle.png)
![生命周期图示](https://cn.vuejs.org/images/lifecycle.png "生命周期各阶段执行情况")


# 理解生命周期图示
> 概念: 每个 Vue 实例在被创建时都要经过一系列的初始化过程——例如，需要设置数据监听、编译模板、将实例挂载到 DOM 并在数据变化时更新 DOM 等。同时在这个过程中也会运行一些叫做生命周期钩子的函数，这给了用户在不同阶段添加自己的代码的机会。

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

## 1.0 new Vue()
> 创建 Vue 对象实例, 构造函数的形式创建
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
    
    /**
      初始化数据, 它会依次初始化props, methods, data, computed, watch
     */
    initState(vm) // 初始化数据
    
    // resolve provide after data/props  在 data/props 之后解析装备(provide) 
    initProvide(vm) // 初始化 Provide
    
    callHook(vm, 'created') // 触发created钩子

    if (vm.$options.el) { // 判断是否有el选项,如果有则执行$mount方法
      vm.$mount(vm.$options.el)
    }
  }
```

## 2.0 Init Lifecycle & Events & Render
> 在触发 BeforeCreate 钩子函数之前初始化事件、生命周期和渲染

## 3.0 执行钩子函数 beforeCreate
> 实例初始化之后立即调用，在数据观测和event/watcher配置之前。常用于初始化非响应式变量


## 4.0 Init injections & state & reactivity
> 初始化 inject/provide。初始化数据state, 它会依次初始化props, methods, data, computed, watch
- initInjections()和 initProvide() 两个方法配套使用，以允许一个祖先组件向其所有子孙后代注入一个依赖.就是用于将父组件 provide 中定义的值，通过 inject 注入到子组件。
  
## 5.0 执行钩子函数 created
> 在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测 (data observer)，属性和方法的运算，watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见
- 常用于简单的ajax请求，页面的初始化

## 6.0 Has 'el' option? 是否有 'el' 选项? 
> 判断实例化 options 中是否有 el 选项
- 实例化时没有 el 选项，进行 "when vm.$mount(el) is called" 操作, 使用 vm.$mount(el) 手动地挂载一个未挂载的实例
- 有 el 选项，则继续向下编译，进行 "判断是否有template选项"
```javascript
if (vm.$options.el) {
  vm.$mount(vm.$options.el)
}
```

## 7.0 Has 'template' options? 是否有 'template' 选项? 
> Compile template into render function * && Compile el's outerHTML as template 这部分主要对 template 进行解析编译。
- 先判断是否有 render 函数，有直接执行 mount.call(this, el, hydarating)
- 再判断实例化 options 中是否有 template 选项? 若有，作为模板编译成 render 函数。
- 没有 template 选项，外部 HTML 作为编译模板
- render 函数选项 > template选项 > outer HTML

```javascript
// vue/src/platforms/web/entry-runtime-with-compiler.js

const mount = Vue.prototype.$mount // 保存之前定义的 $mount 方法，然后重写
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && query(el) // 内部判断el是否是字符串，不是的话就直接返回

  const options = this.$options
  if (!options.render) { // 判断是否有render函数
    let template = options.template
    if (template) { // 判断是否有 template 选项
      // code ...
    } else if (el) { // 没有 template 选项，外部 HTML 作为编译模板
      template = getOuterHTML(el)
    }
  }
  return mount.call(this, el, hydrating)
}

function getOuterHTML (el: Element): string {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    const container = document.createElement('div')
    container.appendChild(el.cloneNode(true))
    return container.innerHTML
  }
}

Vue.compile = compileToFunctions // 对最后生成的模版进行解析，生成render
```

## 8.0 执行钩子函数 beforeMount