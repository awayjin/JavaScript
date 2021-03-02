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

const echo = <T3>(arg: T3) => {
  return arg
}
const f = <T1 extends {}>(arg1: T1) => <T2 extends {}>(arg2: T2) => {
  return { arg1, arg2 };
}
const ff = <T1>(arg1: T1) => {
  return { arg1 };
}
const f2 = <G1>(arg: G1) => {
  return arg
}
const fr1 = f2(3);
const fr2 = f2('str');
const fr3 = f2(false);
console.log(fr1)
console.log(fr2)
console.log(fr3)

function echo2<T>(arg: T): T {
  return arg
}
const result = echo2(true)
const result2 = echo2('str')
const result3 = echo2(11)
const result4 = echo2(null)

function swap<T, U> (tuple: [T, U]): [U, T] {
// function swap<T, U> (tuple: [T, U]): [T, U] { // wrong
  return [tuple[1], tuple[0]]
}
let arr = ['str', 123]
// @ts-ignore
const tupleSwap = swap(arr)
const tupleSwap2 = swap(['str', 123])
// console.log(tupleSwap)
console.log(tupleSwap2)
console.log(arr)

const arr2: (object)[] = []
arr2.push({a: 1})
// arr2.push(33) // wrong

// echo with arr
function echoWithArr<T>(arg: T[]): T[] {
  console.log('a', arg.length)
  return arg
}
const a1 = echoWithArr(arr)
// const a2 = echoWithArr('str') // wrong

type IWithLength = {
  length: number;
}
// 约束泛型 extends
function echoWithLength<T extends IWithLength>(arg: T): T {
  console.log('a', arg.length)
  return arg
}
const wl1 = echoWithLength([11, 22])
const wl2 = echoWithLength({ length: 10, height: 20})
const wl3 = echoWithLength('str')
// const wl4 = lechoWithLength(11) // wrong
let arr3: number[] = [1, 2]
let gnFunc = <T> (arg: T): T => {
  return arg
}
let gn1 = gnFunc('str')

// 泛型（Generics - 类和泛型
class Queue<T> {
  list = [];
  push (item: T) {
    this.list.push(item)
  }
  pop (): T {
    return this.list.pop()
    // return this.list.shift()
  }
  shift () {
    return this.list.shift()
  }
}
const q1 = new Queue();
q1.push(333)
q1.push('str')
// console.log('generics class:', q1.pop().toFixed()) // wrong
console.log('generics class:', q1.shift().toFixed(3))

// 泛型（Generics - 接口和泛型
interface IKeyPair<T, U> {
  key: T;
  value: U;
}
const kp1: IKeyPair<string, number> = { key: 'str', value: 11 };
const kp2: IKeyPair<boolean, string> = { key: true, value: 'str'}
const arr4: (number)[] = [11]
const arr5: Array<number> = [11]

interface IPlus {
  (a: number, b: number): number;
}
// 函数和泛型
function plus(a: number, b: number): number {
  return  a + b;
}
interface IPlusGen<T> {
  (a: T, b: T): T;
}
function connect(a: string, b: string): string {
  return a + b;
}
const p1:IPlus = plus;
const p2:IPlusGen<string> = connect;

function sum(x: number, y: number) {
  return x + y
}
const sumR1: (x: number, y: number) => number = sum