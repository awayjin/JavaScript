// 函数和类型推断

const add = function (x: number, y: number = 100) {
  return y === 100 ? x : x + y
}
const add2: (x: number) => number = add