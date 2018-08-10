/* @flow */

function split(str) {
  return str.split(' ')
}

// split(11)
split('11')

// 类型注释是以冒号 : 开头
function add(x: number, y: number) {
  return x + y
}
add(10, 1)
// add('hello', 1)

var arr: Array<number> = [1, 2, 3] // 数组
// arr.push('Hello')
arr.push(33)

// 类和对象
class BarClass {
  x: string;
  y: string | number;
  z: boolean

  constructor (x: string, y: string | number) {
    this.x = x
    this.y = y
    this.z = false
  }
}

var bar: Bar = new Bar('hello', 4)
// var bar3: Bar = new Bar(5, 4)

// 任意类型?
var foo: ?string = null