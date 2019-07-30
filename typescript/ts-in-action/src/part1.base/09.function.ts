// 函数定义4种方式

console.log(
  Array(20).join('-'),
  '08函数相关',
  Array(20).join('-')
)

function add1Fun(x: number, y: number) {
  return x + y
}
console.log('add1Fun:', add1Fun(4, 5))

// 通过一个变量定义函数类型
let add2Fun = (x: string, y: any) => x + y
console.log('add2Fun:', add2Fun('str---', new Date()))

// 通过一个类型别名定义函数类型
let add3Fun: (x: number, y: number) => number
type add3Fun2 = (x: number, y: number) => number
// console.log('add3Fun:', add3Fun(10, 5))

// 通过接口定义函数类型
interface add4Func {
  readonly id: number;
  (x: number, y: number): number
}