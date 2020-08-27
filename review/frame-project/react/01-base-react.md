## 1. DOM 元素
> React 实现了一套独立于浏览器的 DOM 系统，兼顾了性能和跨浏览器的兼容性。我们借此机会完善了浏览器 DOM 实现的一些特殊情况。

在 React 中，所有的 DOM 特性和属性（包括事件处理）都应该是小驼峰命名的方式。例如，与 HTML 中的 tabindex 属性对应的 React 的属性是 tabIndex。例外的情况是 aria-* 以及 data-* 属性，一律使用小写字母命名。比如, 你依然可以用 aria-label 作为 aria-label。

```javascript
function DomPage () {
  const html = 'First &middot; &lt; Second'
  function createMarkup() {
    return {__html: 'First &middot; Second'};
  }

  const [check, setCheck] = useState(false)
  const toggleCheck = () => {
    setCheck(!check)
  }

  return (
    <>
      <h2>dom </h2>
      { html }
      <div>
        <input type="checkbox" defaultChecked={true}/>
        <input type="checkbox" checked={check} onChange={toggleCheck} />
        <button onClick={ toggleCheck }>toggle</button>
      </div>
      <div dangerouslySetInnerHTML={{'__html': html} } />
      <div dangerouslySetInnerHTML={createMarkup()}></div>
      <div dangerouslySetInnerHTML={createMarkup()} />
    </>
  )
}
```

## 2. 事件处理 handling-events
1. event 是 SyntheticEvent ，模拟出来 DOM 事件所有能力
2. event.nativeEvent 是原生事件对象
3. currentTarget 所有的事件，都被挂载到 document 上

React 元素的事件处理和 DOM 元素不同点
- React 事件的命名采用小驼峰式（camelCase），而不是纯小写
- 使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串。

event 是一个合成事件。React 根据 W3C 规范来定义这些合成事件(SyntheticEvent: https://zh-hans.reactjs.org/docs/events.html) . event 是跨浏览器包装器

```javascript
// 静态方法, this 指向实例
class EventDemo {
  clickHandler2 = (event) => {
    console.log('静态方法 this....', this)
    console.log('event', event)
  }
// 实例方法
  clickHandler1(event) {
    console.log('this....', this) // this 默认是 undefined
    console.log('event....', event) // this 默认是 undefined
  }
}
```

在 JavaScript 中，class 的方法默认不会绑定 this.

向事件处理程序传递参数:
```javascript
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

## 3. 表单
受控组件

多个输入:
处理多个输入, 当需要处理多个 input 元素时，我们可以给每个元素添加 name 属性，并让处理函数根据 event.target.name 的值选择要执行的操作..

受控输入空值:
在受控组件上指定 value 的 prop 会阻止用户更改输入。如果你指定了 value，但输入仍可编辑，则可能是你意外地将value 设置为 undefined 或 null。

## 4. Refs and the DOM
Refs 提供了一种方式，允许我们访问 DOM 节点或在 render 方法中创建的 React 元素

何时使用 Refs
- 管理焦点，文本选择或媒体播放。
- 触发强制动画。
- 集成第三方 DOM 库。

## 5. React组件生命周期
react 生命周期:
https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

https://g.yuque.com/atrue/at/rvqm1u?language=zh-cn

Vue 生命周期:
http://cn.vuejs.org/images/lifecycle.png

## 6. setState
不可变值，可能是异步更新，可能会被合并

## 7. 高级特性
- 函数组件
- Portals
- context
- 异步组件

- 非受控组件
  - 优先使用受控组件，符合React设计原则；
  - 必须操作DOM时，再使用非受控组件；
  - eg: ref,
    defaultValue-defaultChecked,
    手动操作DOM元素
    
    
- react 的性能优化
  shouldComponentUpdate(简称SCU)
  PureComponent 和 React.memo
  不可变值 immutable.js

## 8. 什么场景需要用React Portals
- 组件默认会按照既定层次嵌套渲染；
- 如何让组件渲染到父组件以外？
    PS : this.props.children相当于vue的slot,可以获取父组件中两个标签中的内容

- 父组件使用了 oveflow:hidden；
  联想起在PC端plus会员的react中，头部卡片的气泡，使用position超出了本身的层级，使用 Portals 可以轻松外迁移该气泡组件。
- 父组件z-index值太小
- fixed 需要放在 body 第一层

## 9. Context
- 公共信息（语言、主题）如何传递给各个组件？
  用props 太繁琐
  用 redux 小题大做 ，本身没有什么逻辑，只是一些变量的传递

- createContext
- Context.Provider
- 函数式组件-Context.Consumer, 类-this.context



## 参考
react相关知识汇总：
https://www.cnblogs.com/xiaozhumaopao/p/12716280.html