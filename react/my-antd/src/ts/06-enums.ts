// primitive values
// Symbol bigInt
// any union-types
// array, tuple元组-元组类型允许表示一个已知元素数量和类型的数组
// 函数和类型推断

// 类 - 封装、继承、多态
// 修饰符 public private protected, readonly, static
// 类和接口

// 枚举和常量枚举
enum Direction {
  up = 100,
  down,
  left,
  right
}

/*
{
  '100': 'up',
  '101': 'down',
  '102': 'left',
  '103': 'right',
  up: 100,
  down: 101,
  left: 102,
  right: 103
}
*/
console.log(Direction)
console.log(Direction[100])
console.log(Direction['up'])

// 常量枚举
const enum Action {
  run = 'run',
  walk = 'walk',
  fast = 'fast'
}
console.log(Action.run)