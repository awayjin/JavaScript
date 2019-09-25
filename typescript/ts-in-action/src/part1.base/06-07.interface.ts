// 1、接口约束对象 函数 类的结构
// 2、对象的接口如何定义
// 3、关键字 interface
// 4、作用 ：规范对象的属性 属性的类型 属性值的类型
// 5、类型断言 用as 或者<>的形式 ，后者在react中使用会出问题
// 6、可选属性 通过？来设置
// 7、只读属性 通过readonly 来设置
// 8、当不确定接口中属性个数时需要使用 索引签名
// 9、索引签名包括字符串索引签名和数字索引签名
// 10、当接口中定义了一个索引后，例如设置了 【x:string】= string，就不能设置y：number了。
// 因为设置了【x:string】= string相当于这个接口的字符串索引返回值都是字符串，而y：number违背这一原则，冲突了。反过来 如果定义了【x:string】=Number, 就不能设置 y:string了。
// 11、 可以同时使用两种类型的索引，但是数字索引的返回值必须是字符串索引返回值类型的子类型。
// 因为 数字索引或转化为字符串索引，而转化的这部分索引对应的值的类型范围 超过了 字符串索引类型的范围，就会报错，相当于超出范围。

console.log(
  Array(10).join('-'),
  '06-07 对象接口、字符中接口、函数接口',
  Array(10).join('-')
)

// 3. 函数类型接口
let add2 = (x: number, y: number) => x + y // 用一个变量定义函数类型
// console.log('add3:', add3(4, 5))

// 函数类型接口
interface Add3 {
  (x: number, y: number): number
}

// 类型别名
type Add4 = (x: number, y: number) => number
//
let add33: Add3 = (a, b) => a + b;
let add44: Add4 = (a, b) => a + b;
console.log('add2 add2:', add2(3, 5))
console.log('函数类型接口 add33:', add33(4, 5))
console.log('类型别名 add44:', add44(14, 15))

// 混合类型接口
interface Lib {
  (): void;
  version: string;
  doSomething(): void
}

// 创建多个实例
function getLib () {
  let lib: Lib = (() => {}) as Lib; // 类型断言 -- 全局单例
  lib.version = '1.0.1'
  lib.doSomething = () => 'doSomething'
  return lib
}

let lib1 = getLib()
console.log('创建多个实例, lib1()', lib1.doSomething())
let lib2 = getLib()
console.log('创建多个实例, lib2()', lib2.version)

/*------------------------------------------------------------------*/


// 1. 对象类型接口
interface List {
  readonly id: number, // 只读属性
  name: string;
  // age?: number; // 可有属性
  // 字符串索引签名, 用任意字符串来索引 List， 这样 List 就支持多个属性了
  [x: string]: any;
}

interface Result {
  data: List[]
}

function render(result: Result) {
  result.data.forEach((value) => {
    console.log('value id, name:', value.id, value.name)
    if (value.age) {
      console.log('age:', value.age)
    }
    // value.id++
  })
}

let result = {
  data: [
    { id: 5, name: 'E', sex: 'female' },
    { id: 6, name: 'F', sex: 'male', age: 20 }
  ]
}

render(result)
// 类型断言
render(<Result>{
  data: [
    { id: 5, name: 'E', sex: 'female' },
    { id: 6, name: 'F', sex: 'male', age: 20 }
  ]
})
// 类型断言
render({
  data: [
    { id: 5, name: 'E', sex: 'female' },
    { id: 6, name: 'F', sex: 'male', age: 20 }
  ]
} as Result)



// 类型断言
render({
  data: [
    { id: 1, name: 'A', sex: 'female' },
    { id: 2, name: 'B', age: 20 }
  ]
} as Result)

render(<Result> {
  data: [
    { id: 3, name: 'c', sex: 11, height: 20, aa: 3 },
    { id: 4, name: 'd', sex: '33' }
  ]
})

// 2. 字符串类型接口--
// 用任意数字来索引 StringArray
interface StringArray {
  [index: number]: string // 字符串类型接口
}
let chars: StringArray = ['a', 'b']

// 用任意字符串来索引 Names
interface Names {
  [x: string]: string;
  // y: numer;
  [z: number]: string;
}


let hel: string = '33'

let hello2: string = 'Hello TypeScript'


// 对象类型接口
function printLabel(labeledObj: { label: string }) {
  console.log(labeledObj.label)
}

let myObj = { size: 10, label: 'size 10 object..'}

printLabel(myObj)

// 用接口来描述
interface LabeledValue {
  label: string
}

function printLabel2(labeledObj: LabeledValue ) {
  console.log(labeledObj.label)
}

printLabel2(myObj)

// 可选属性
interface SquareConfig {
  color?: string,
  width?: number
}



console.log('--- from 06-07 interface.ts')