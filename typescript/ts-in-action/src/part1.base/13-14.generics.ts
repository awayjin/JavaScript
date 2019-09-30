console.log(
  Array(10).join('-'),
  '13-14 泛型',
  Array(10).join('-')
)

function log(value: any) {
  console.log(value)
  return value
}

// 泛型：不预先确定的数据类型，具体的类型在使用时才能确定
// 保证输入参数和返回值是一致的
function log2<T>(value: T) {
  console.log(value)
  return value
}

log2<string[]>(['a', 'b'])
log2<number>(44)
log2(['a', 4])


log(['1a', 'b'])
log(55)
log(['1a', 4])


// 定义一个泛型函数类型
type Log = <T>(value: T) => T
let myLog: Log = log

// 泛型接口
interface log3<T = string> {
  // <T>(value: T): T
  (value: T): T
}

let myLog3: log3<number> = log


// 泛型的好处
// 1.函数和类可以支持多种类型，增加的程序的可扩展性
// 2.不必写多条函数重载，联合类型声明，增强代码的可读性
// 3.灵活控制类型之间的约束
//
// 总结：
// 泛型不仅可以保持类型的一致性，又不失程序的灵活性，同时也可以通过泛型约束，
// 控制类型之间的约束。从代码的上来看，可读性，简洁性，远优于函数重载，联合类型声明以及 any 类型的声明。

// 泛型类与泛型约束
class Log4<T> {
  run (value: T) {
    console.log(value)
    // return value
  }
}

let log4 = new Log4<number>()
log4.run(999)
let log42 = new Log4()
log42.run('泛型类与泛型约束')

interface Length {
  length: number
}
// 都要 length 属性
function Log5<T extends Length>(value: T): T {
  console.log(value, value.length)
  return value
}
Log5([1])
Log5('str')
Log5({ length: 2})

function identity13(arg: number) : number {
  return arg
}

// 我们需要一种方法使返回值的类型与传入参数的类型是相同的。
// 这里，我们使用了 类型变量，它是一种特殊的变量，只用于表示类型而不是值
function identity14 <T> (arg: T): T {
  return arg
}