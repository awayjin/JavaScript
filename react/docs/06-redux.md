# Redux

React 只是 DOM 的一个抽象层，并不是 Web 应用的完整解决方案。

Redux是一个用来管理管理数据状态和UI状态的JavaScript应用工具


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

## 参考

Redux 工作流：
https://user-gold-cdn.xitu.io/2020/3/16/170e26e85da402c5?imageView2/0/w/1280/h/960/format/webp/ignore-error/1

基本用法：
  http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html

