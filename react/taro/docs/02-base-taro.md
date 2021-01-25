## 生命周期与state
- componentWillMount 第一次渲染之前，只执行一次
- componentDidMount 第一次渲染之后，只执行一次
- index.config.ts 配置系统导航
- componentWillUnmount 卸载时执行，只执行一次

- componentDidShow 和 componentDidHide 页面显示/隐藏触发
- shouldComponentUpdate 检查此次 setState 是否要进行 render 调用, 一般用来多次调用时，提升 render 的性能.

- componentWillReceiveProps 会在父组件传递给子组件的参数发生改变时触发. 相当于 Vue 的 watch

- defaultProps
- 函数传值必须加 `on`


## 2-5 路由功能及资源引用
- Taro.navigateTo(option) 相当于 router.push
- Taro.redirectTo(option) 相当于 router.replace

- Taro.getCurrentInstance().router 获取 router 相关信息或 `const router = useRouter()`
- {props.children}, attr: {props.myAttr}

- children
```
<Dialog myAttr='my attr'>
    <Text>first</Text>
</Dialog>
<Dialog>second</Dialog>
<View>我是 dialog, {props.children}, attr: {props.myAttr}</View>
```

## 2-7 事件处理与样式表
- event.stopPropagation()
- 传入的参数是函数，参数名必须 `on` 开头

- process.env.TARO_ENV 环境变量

## demo
- onInput 没有 onchange
- Taro.showToast({ title: ',', icon: 'none' })
- event.target.value


## npm info @tarojs/cli
