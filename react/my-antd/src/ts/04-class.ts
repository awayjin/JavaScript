// primitive values
// Symbol bigInt
// any union-types
// array, tuple元组-元组类型允许表示一个已知元素数量和类型的数组
// 函数和类型推断

// 类 - 封装、继承、多态
// 修饰符 public private protected, readonly, static

class Animals {
  protected name: string = '3';
  // public name: string = '3';
  static categories: string[] = ['snake',  'bear', 'wild', 'duck'];
  static arr: Array<number> = [11, 22];
  constructor(name: string) {
    this.name = name
  };
  run () {
    return `${this.name} is running.`
  };
}
const snake = new Animals('snake')
console.log(snake.run())
console.log(Animals.categories)
console.log(Animals.arr)

class Duck extends Animals {
  bark () {
    return `${this.name} is barking.`
  }
  run () {
    return `${this.name} is barking in Duck Class.`
  }
}
const duck = new Duck('duck')
console.log(duck.run())
console.log(duck.bark())