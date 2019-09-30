
console.log(
  Array(10).join('-'),
  '04 datatype',
  Array(10).join('-')
)

const friends = [
  { name: 'John', age: 30 },
  { name: 'Ana', age: 20 },
  { name: 'jin', age: 21 },
  { name: 'Chris', age: 25 }, // ES2017 允许存在尾逗号
]
// @ts-check
interface Person {
  name: string,
  age: number
}

function comparePerson(a: Person, b: Person) {
  if (a.age  < b.age) {
    return -1
  }
  if (a.age > b.age ) {
    return 1
  }

  return 0
}
console.log('friends.sort:', friends.sort(comparePerson))
console.log('friends.sort:', friends.sort((a: Person, b: Person) => a.age - b.age ))

// document.querySelector('.app').innerHTML = hello

// 基本类型(原始类型)
let bool: boolean | Array<number> = false
let str: string = 'str'
let num: number | undefined | null = 55
// let sym: Symbol = Symbol()
// let sym2 = Symbol()
let bool3 = '33'
let un: undefined = undefined
// un = 33 // 不能
let nu: null = null
num = undefined // "strictNullChecks": false 才可以
num = 33  // "strictNullChecks": false 才可以

bool = [11, 22]
console.log('bool:', bool)
bool = false
console.log('bool:', bool)

// 数组
let list: number[] = [1, 2]
// 数组泛型
let list2: Array<string> = ['3']

let arr1: number[] = [11, 22]
let arr2: Array<number> = [33, 44]
let arr3: Array<string | number> = ['55', '66', 44] // 泛型接口
arr3 = ['33']

// 元组-Tuple
// 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同
// 元组可以插入不能越界访问
let tuple: [string, number]
// tuple = ['hello', 2]
tuple = ['2', 4]
tuple.push(33)
console.log('tuple', tuple)
// console.log('tuple', tuple[2]) // error


// 函数
function add(x: number, y: number) {
  return x +  y
}
let compute = (x: string, y: number) => x
compute = (a, b) => a + b

// 对象
let obj: Object = { a: 11, b: 22 }
// obj.x = 3 // 不能
let obj2: { x: number, y: number } = { x: 1, y: 2 }
obj2.x = 11

// null undefined
// 默认情况下null和undefined是所有类型的子类型. -- 不能这样了
//  "strictNullChecks": true,    /* Enable strict null checks. */
let u: undefined = undefined
let n: null = null
let unusable: void = undefined;
// unusable = null; // OK if `--strictNullChecks` is not given
// let d: number = null
// d = undefined

// never类型表示的是那些永不存在的值的类型
// never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式
// 或箭头函数表达式的返回值类型
// strictNullChecks: true
function error04(message: string): never {
  throw new Error(message)
}
function fail() {
  return error04('Something failed.')
}
// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
  while (true) {}
}

// void
function noV (): void {

}
let noReturn = (): void => {

}

// any - 任何类型
let x
x = 1
x = '2'
x = []
x = {}
x = (): void => {}

// never - 永远不会有返回值
let error = () => {
  throw new Error('error 33')
}
let endless = () => {
  while (1) {}
}

// object表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型。
declare function create4 (o: object | null): void;
// create4({ a: 2}) // create4 is not defined
// create(null)
// create(3) // error
// create(false) // error
// create(new Date)

// 任意值
let anyThing: any = 'hello'
console.log('anyThing:', anyThing.myName)
// anyThing.setName('Jerry')

// 联合类型使用 | 分隔每个类型。
// 当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，
// 我们只能访问此联合类型的所有类型里共有的属性或方法：
function getLength (something: string | number): string {
  // return something.length // error
  return something.toString()
}

// 类型断言
// 有时候你会遇到这样的情况，你会比TypeScript更了解某个值的详细信息
// 类型断言有两种形式。 其一是“尖括号”语法：
// 另一个为as语法：
let someValue: any = 'this is a string.'
let strLength: number = (<string>someValue).length
someValue.length
let strLengthTwo: number = (someValue as string).length

// 泛型
// 我们需要一种方法使返回值的类型与传入参数的类型是相同的。
// 这里，我们使用了 类型变量，它是一种特殊的变量，只用于表示类型而不是值。
function identity<T>(arg: T): T {
  return arg
}