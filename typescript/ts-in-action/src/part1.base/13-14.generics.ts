console.log(
  Array(10).join('-'),
  '13-14 泛型',
  Array(10).join('-')
)

// 泛型类与泛型约束


// 我们需要一种方法使返回值的类型与传入参数的类型是相同的。
// 这里，我们使用了 类型变量，它是一种特殊的变量，只用于表示类型而不是值
function identity14 <T> (arg: T): T {
  return arg
}


// 1. 一个函数接受字符串数组
// 函数重载
function log1(value: string): string;
function log1(value: number): number;
function log1(value: string[]): string[];

// 联合类型
function log1(value: string | number |  string[]): string | number | string[] {
  if (typeof value === 'string') return 'str'
  if (typeof value === 'number') return 'number'
  if (typeof value === 'object') return ['11', '22']
  return value
}

// 泛型
function log11<T>(value: T): T {
  return value
}

// 泛型调用
log11<string[]>(['1', '2']) // 字符串数组
log11<number[]>([1, 2]) // 数值数组
log11([1, 2]) // 类型推断
log11(['1', '2'])

// 2. 不仅可以用 泛型 定义函数，也可以用泛型定义函数类型
// 类型别名
type Log22 = (x: number, y: number) => number
type Log222 = <T>(value: T) => T
let myLog22: Log22 = function (value) { return value}
let myLog222: Log222 = log11

// 3. 泛型接口
interface Log3 {
  <T>(value: T): T
}

// 当泛型变量约束整个接口后，实现必须指定一个类型
interface Log33<T> {
  (value: T): T
}
let myLog33: Log33<string> = (value: string) => {
  return '3'
}
let myLog333: Log33<number> = log11


// 接口定义中指定一个默认类型
interface Log333<T = string> {
  (value: T): T
}
let myLog3333: Log333 = data => data

// 4. 泛型可以约束类的成员
// 泛型不能约束类的静态成员
class Log44<T> {
  run (value: T) {}
}

let log44 = new Log44<number>()
log44.run(1)

let log444 = new Log44()
log444.run('1')
log444.run({ a: 3})

// 5. 打印函数参数属性 - 类型约束
// 需要有 length 属性
interface Length {
  length: number
}
function Log55<T extends Length>(value: T) {
  console.log(value, ', len:', value.length)
  return value
}
Log55([])
Log55('3')

// 6. 泛型 - 总结

// 泛型：不预先确定的数据类型，具体的类型在使用时才能确定
// 保证输入参数和返回值是一致的

// 定义一个泛型函数类型


// 泛型的好处
// 1.函数和类可以支持多种类型，增加的程序的可扩展性
// 2.不必写多条函数重载，联合类型声明，增强代码的可读性
// 3.灵活控制类型之间的约束
//
// 总结：
// 泛型不仅可以保持类型的一致性，又不失程序的灵活性，同时也可以通过泛型约束，
// 控制类型之间的约束。从代码的上来看，可读性，简洁性，远优于函数重载，联合类型声明以及 any 类型的声明。