

console.log(
  Array(10).join('-'),
  '04 datatype',
  Array(10).join('-')
)

const friends = [
  { name: 'John', age: 30 },
  { name: 'Ana', age: 20 },
  { name: 'jin', age: 21 },
  { name: 'Chris', age: 25 }, // ES2017 允许存在尾逗号
]
// @ts-check
interface Person {
  name: string,
  age: number
}

function comparePerson(a: Person, b: Person) {
  if (a.age  < b.age) {
    return -1
  }
  if (a.age > b.age ) {
    return 1
  }

  return 0
}
// console.log('friends.sort:', friends.sort(comparePerson))
console.log('friends.sort:', friends.sort((a: Person, b: Person) => a.age - b.age ))

// document.querySelector('.app').innerHTML = hello

// 基本类型(原始类型)
let bool: boolean | Array<number> = false
let str: string = 'str'
let num: number | undefined | null = 55
// let sym: Symbol = Symbol()
// let sym2 = Symbol()
let bool3 = '33'
let un: undefined = undefined
// un = 33 // 不能
let nu: null = null
num = undefined // "strictNullChecks": false 才可以
num = 33  // "strictNullChecks": false 才可以

bool = [11, 22]
console.log('bool:', bool)
bool = false
console.log('bool:', bool)

// 数组
let arr1: number[] = [11, 22]
let arr2: Array<number> = [33, 44]
let arr3: Array<string | number> = ['55', '66', 44] // 泛型接口
arr3 = ['33']

// 元组-Tuple
// 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同
// 元组可以插入不能越界访问
let tuple: [string, number]
// tuple = ['hello', 2]
tuple = ['2', 4]
tuple.push(33)
console.log('tuple', tuple)
// console.log('tuple', tuple[2]) // error


// 函数
function add(x: number, y: number) {
  return x +  y
}
let compute = (x: string, y: number) => x
compute = (a, b) => a + b

// 对象
let obj: Object = { a: 11, b: 22 }
// obj.x = 3 // 不能
let obj2: { x: number, y: number } = { x: 1, y: 2 }
obj2.x = 11


// void
function noV (): void {

}
let noReturn = (): void => {

}

// any - 任何类型
let x
x = 1
x = '2'
x = []
x = {}
x = (): void => {}

// never - 永远不会有返回值
let error = () => {
  throw new Error('error 33')
}
let endless = () => {
  while (1) {}
}

// 数字枚举
enum Direction {
  up = 11,
  Down,
  Left,
  Right
}


// 字符串枚举
enum Direction2 {
  up = 'up',
  left = 'left',
  right = 'right',
  down = 'up'
}
