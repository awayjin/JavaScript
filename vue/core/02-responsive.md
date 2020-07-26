## vue 响应式
- 组件 data 的数据变化，就会触发视图更新.
- 实现数据驱动视图的核心 API - Object.defineProperty

```javascript
let obj = {}
let name = 'sun';
Object.defineProperty(obj, 'name', {
  get () {
    console.log('get')
    return name
    // return this.name // // Maximum call stack size exceeded
  },
  set (value) {
    console.log('set', value)
    name = value
    // this.name = value // Maximum call stack size exceeded
  }
})
console.log('obj.name:', obj.name) // get sun
obj.name = 'moon' // set moon
console.log('obj.name:', obj.name) // get moon
```

## Object.defineProperty 缺点
- 深度监听，需要递归到底，一次性计算量大
    - 初始化深度监听
    - 设置新值需要深度监听。(把普通基本值设置为对象) 
    
- 无法监听新增/删除属性(Vue.set Vue.delete)

- 无法原生监听数组，需要特殊处理