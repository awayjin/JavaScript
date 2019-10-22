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
// y16 = x16 // 不能， 走-游-叫

// 2. 函数兼容性
type Hanlder = (a: number, b: number) => void
function hof(handler: Hanlder) {
  return handler
}

// 1. 参数的个数