// primitive values
// Symbol bigInt
// any union-types
// array, tuple元组-元组类型允许表示一个已知元素数量和类型的数组

// 函数和类型推断

const add = function (x: number, y: number = 100) {
  return y === 100 ? x : x + y
}
const add2: (x: number) => number = add