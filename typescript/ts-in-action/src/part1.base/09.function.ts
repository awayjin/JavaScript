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

// 参数可选
function add5(x: number, y?: number) {
  return y? x + y: x;
}
add5(5)

// 默认参数
function add6(x: number, y = 1) {
  return x + y
}
console.log('默认参数 add6:', add6(4))

// 剩余参数
function add7(x: number, ...rest: number[]) {
  return x + rest.reduce((acc, cur) => acc + cur)
}
console.log('剩余参数 add7:', add7(4, 1, 2, 3, 5))

// 函数重载
function add8(...rest: number[]): number;
function add8(...rest: string[]): string;
function add8(...rest: any[]): any {
  let first = rest[0]
  if (typeof first === 'string') {
    return rest.join('-')
  }

  if (typeof first === 'number') {
    return rest.reduce((acc, cur) => acc + cur)
  }
}
console.log('函数重载 add8 number:', add8( 1, 2, 3, 5))
console.log('函数重载 add8 string:', add8('a', 'b'))
