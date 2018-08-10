function split(str) {
  return str.split(' ');
}

// split(11)
split('11');

// 类型注释是以冒号 : 开头
function add(x, y) {
  return x + y;
}
add(10, 1);
// add('hello', 1)

var arr = [1, 2, 3]; // 数组
// arr.push('Hello')
arr.push(33);

// 类和对象
class BarClass {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.z = false;
  }
}

var bar = new Bar('hello', 4);
// var bar3: Bar = new Bar(5, 4)

// 任意类型?
var foo = null;