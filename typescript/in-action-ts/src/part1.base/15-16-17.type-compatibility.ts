
// 1. 类型兼容性 - 鸭式辨型
// 成员少的兼容成员多的
let s: string = 'a'
// s = null

interface X {
  a: any;
  b: any;
}

interface Y {
  a: any;
  b: any;
  c: any
}

let x16: X = {
  a: 1, b: 2
}

let y16: Y = {
  a: 1, b: 2, c: 3
}

// 成员少的兼容成员多的
x16 = y16
// y16 = x16 // 不能， 鸟，走-游-叫



// 2. 函数兼容性 - 通常发生在两个函数相互赋值的情况下

type Handler = (a: number, b: number) => void
// 高阶函数传入参数
function hof(handler: Handler) {
  return handler
}

// 1). 参数的个数
let handler1 = (a: number) => a
let hof1 = hof(handler1)
console.log(hof1(3, 4))

let handler2 = (a: number, b: number, c: number) => {}
// hof(handler2) // 参数多了，三个参数，不能赋值

// 固定参数、可选参数和剩余参数
let a = (p1: number, p2: number) => {}
let b = (p1?: number, p2?: number) => {}
let c = (...args: number[]) => {}

// 固定参数 - 可以兼容可选参数和剩余参数
a = b
a = c

// 可选参数 - 是不能兼容固定参数的和剩余参数的
// b = a // 错误，关闭 strictFunctionTypes = false 可以实现兼容
// b = c

// 剩余参数 - 可以兼容固定参数和可选参数
c = a
c = b

// 2). 参数类型
let handler = (a: string) => {}
// hof(handler) // 错误，类型不兼容

// 3. 对象类型就复杂了
// 可以看成参数，参数多的就兼容参数少的
interface Point3D {
  x: number;
  y: number;
  z: number;
}
interface Point2D {
  x: number;
  y: number;
}
let p3d = (point: Point3D) => {};
let p2d = (point: Point2D) => {};


// console.log(p3d({ x:1, y:2, z: 3})) // ok

// console.log(p3d(1， 2， 3))
interface Person16  {
  x: number;
  y: number;
}
let p1: Person16 = {
  x: 1,
  y: 2
}


p3d = p2d // 成员个数多的兼容成员个数少的
// p2d = p3d // 不兼容


// 3）返回值类型要相同
function overload (x: number, y: number): number;
function overload (x: string, y: string): string;
function overload(x: any, y: any): any {}
overload(3, 4)
overload('a', 'b')


// 4. 枚举类型兼容性
enum Fruit { Apple, Banana }
enum Color { Red, Black}

let fruit: Fruit.Apple = 2
let banana: Fruit.Banana = 12

// 枚举类型赋值给 number 类型
let no: number = Fruit.Apple
// 枚举之间不兼容
// let color: Color.Red = Fruit.Apple

// console.log('no:', no)
// console.log('fruit:', fruit)
// console.log('banana:', banana)
// console.log('Fruit:', Fruit['Apple'])
// console.log('Fruit:', Fruit['Banana'])

// 5. 类之间兼容性 - 静态成员和构造函数不参与比较
class ClassA {
  constructor(p: number, q: number) {}
  id: number = 1
  private name: string = '' // 私有成员
}
class ClassB {
  constructor(p: number) {}
  id: number = 2
}
let classA = new ClassA(1, 2)
let classB = new ClassB(1)
// classA = classB
// classB = classA

class aSub extends ClassA {}

// 6. 泛型接口兼容性
interface Empty<T> {
  // value: T
} // 泛型接口
let obj11: Empty<number> = {}
let obj22: Empty<string> = {}
obj11 = obj22

// 泛型函数
let log111 = <T>(x: T): T => {
  return x
}
let log222 = <DD>(y: DD): DD => {
  return y
}
log111 = log222

// 7. 口诀
// 结构之间兼容：成员少的兼容成员多的。
// 函数之间兼容：参数多的兼容参数少的。