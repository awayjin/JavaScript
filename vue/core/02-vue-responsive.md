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

```javascript
function updateView () {
  console.log('update view')
}

const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];
// 重新定义数组原型
const arrayProto = Array.prototype;
// 创建新对象，原型指向 arrayProto，扩展的新方法不会影响原型
// Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__
const arrayMethod = Object.create(arrayProto);
methodsToPatch.forEach(method => {
  arrayMethod[method] = function () {
    updateView()
    // arrayProto[method].call(this, ...arguments)
    arrayProto[method].apply(this, arguments)
    // Array.prototype.push.call(this, ...arguments)
  }
})

function defineReactive (target, key, value) {
  // 深度监听, 是对象或数组递归到底
  observe(value)
  Object.defineProperty(target, key, {
    get () {
      return value
    },
    set (newValue) {
      if (newValue !== value) {
        console.log('--> newValue:', newValue)
        // 设置新值也需要深度监听
        observe(newValue)

        value = newValue
        updateView()
      }
    }
  })
}
// 监听
function observe (target) {
  if (typeof target !== 'object' || target === null) {
    // 不是对象或数组
    return target
  }

  // 是数组
  if (Array.isArray(target)) {
    target.__proto__ = arrayMethod // 指向当前数组的原型
    // target.prototype = arrayMethod // wrong, 数组没有 prototype
    // Object.setPrototypeOf(target, arrayMethod)
  }

  for (let key in target) {
    defineReactive(target, key, target[key])
  }
}
const data = {
  name: 'earth',
  age: 19,
  info: {
    dress: 'shenzhen' // 需要深度监听
  },
  list: [11, 22]
}
// data = ''
observe(data)
// data.name = 'moon' // update view
// data.name = 'moon' // 值是一样，不会更新
// data.info.dress = 'shanghai' // update view 深度监听
// data.age = { number: 18 } // update view
// data.age.number = 22 // 设置新值也需要深度监听

data.list.push(33) // 不具备监听数组的能力，需要特殊处理
data.list.splice(0, 0, 10) // 不具备监听数组的能力，需要特殊处理

// data.age = 18 // 新增属性，不会触发更新
// delete data.age // 删除属性，不会触发更新
```

## 继承与原型链(Inheritance and the prototype chain)
> 当谈到继承时，JavaScript 只有一种结构：对象。每个实例对象（ object ）都有一个私有属性（称之为 `__proto__` ）指向它的构造函数的原型对象（prototype ）。该原型对象也有一个自己的原型对象( `__proto__ `) ，层层向上直到一个对象的原型对象为 null。根据定义，null 没有原型，并作为这个原型链中的最后一个环节。

几乎所有 JavaScript 中的对象都是位于原型链顶端的 Object 的实例。

![原型链](./img/prototype-chain.png)