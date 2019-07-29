// 函数类型接口
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


// 对象类型接口
interface List {
  readonly id: number, // 只读属性
  name: string;
  age?: number; // 可有属性
  [x: string]: any; // 字符串索引签名, 用任意字符串来索引 List
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

// 字符串类型接口--
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