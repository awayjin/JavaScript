// primitive values
// Symbol bigInt
// any union-types
// array, tuple元组-元组类型允许表示一个已知元素数量和类型的数组
// 函数和类型推断

// 类 - 封装、继承、多态 class
// 修饰符 public private protected, readonly, static
// 类和接口 interface
// 枚举和常量枚举 enums

// 泛型 generics, tuple元组调换位置
// 约束泛型 extends
// 泛型（Generics - 类和接口
// 泛型（Generics - 函数和泛型
// 泛型（Generics - 接口和泛型

// 类型别名 - type alias
// - 返回字符串或函数结构
// 类型断言 - type assertion
// - <string>

type PlusType = (x: number, y: number) => number;

function sum(x: number, y: number) {
  return x + y
}
const sumR1: (x: number, y: number) => number = sum
const sumR2: PlusType = sum

type NameResolver = () => string;
type NameOrResolver = string | NameResolver;
// 返回字符串或函数结构
function getName(n: NameOrResolver) {
  if (typeof n === 'string') {
    return n
  } else {
    return n()
  }
}
const gn1 = getName('str')
const cb = (a) => { return a}
const gn2 = getName(cb('func arg'));
console.log('gn1', gn1)
console.log('gn2', gn2)

// 类型断言 - type assertion
function getLength(arg: number | string) {
  const str = arg as String
  if (str.length) {
    return str.length
  } else {
    const number = arg as Number
    // return number.toFixed(3)
    return number.toString().length
  }
}
console.log('getLength number', getLength(3))
console.log('getLength str', getLength('abcde'))
function getLength2(arg: number | string) {
  if ((<string>arg).length) {
    return (<string>arg).length
  } else {
    return (<number>arg).toString().length
  }
}
console.log('-- getLength2 number', getLength(3))
console.log('getLength2 str', getLength('abcde'))