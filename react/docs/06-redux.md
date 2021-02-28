# Redux

React 只是 DOM 的一个抽象层，并不是 Web 应用的完整解决方案。

Redux是一个用来管理管理数据状态和UI状态的JavaScript应用工具

## Action Creator 动作创作者
View 要发送多少种消息，就会有多少种 Action。如果都手写，会很麻烦。可以定义一个函数来生成 Action，这个函数就叫 Action Creator

## Redux Dev Tools
```
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
```

p10

## Reducer 必须是纯函数
> 如果函数的调用参数相同，则永远返回相同的结果。它不依赖于程序执行期间函数外部任何状态或数据的变化，必须只依赖于其输入参数。

它的返回结果，是完全由传入的参数state和action决定的，这就是一个纯函数。

这个在实际工作中是如何犯错的？比如在Reducer里增加一个异步ajax函数，获取一些后端接口数据，然后再返回，这就是不允许的（包括你使用日期函数也是不允许的），因为违反了调用参数相同，返回相同的纯函数规则。

## 无状态组件

无状态组件其实就是一个函数，它不用再继承任何的类（class），当然如名字所一样，也不存在state（状态）。

因为无状态组件其实就是一个函数（方法）,所以它的性能也比普通的React组件要好。

## redux-thunk

什么时候会用到这个插件那？

比如在Dispatch一个Action之后，到达reducer之前，进行一些额外的操作，就需要用到middleware（中间件）

在实际工作中你可以使用中间件来进行日志记录、创建崩溃报告，调用异步接口或者路由。

就是对Redux中dispatch的加强

## redux-saga

希望你把业务逻辑单独写一个文件

## connect连接器的使用




## 参考

Redux 工作流：
https://user-gold-cdn.xitu.io/2020/3/16/170e26e85da402c5?imageView2/0/w/1280/h/960/format/webp/ignore-error/1

基本用法：
  http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html

