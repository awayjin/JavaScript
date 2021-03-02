// primitive values
// Symbol bigInt
// any union-types
// array, tuple元组-元组类型允许表示一个已知元素数量和类型的数组

// interface
interface IPerson {
  readonly id: number;
  name: string;
  age: number;
}

let vk: IPerson = {
  name: 'sky',
  age: 16,
  id: 112,
}
vk.age = 14
// vk.id = 10;