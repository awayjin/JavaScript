/**
 * 类类型接口
 * 类实现接口 - implements
 *  接口只能约束类的共有成员。
 *  接口可以像类一样相互继承。
 *
 * 接口继承接口
 * interface Man extends Human
 *
 * 接口继承类
 * // 同时继承
 interface Boy extends Man, Child {}

 6259760213119294

 */

interface Animal12 {
  // new (name: string): void;
  age: number;
  eat: string;
  run (): string;
}

interface AnimalList {
  data: Animal12[]
}

let duck12: Animal12 = {
  age: 12,
  eat: 'rice',
  run () {
    return this.eat
  }
}

// 类实现接口 implements
class Dog12 implements Animal12 {
  options: any;
  constructor(options: object) {
    this.options = options
  }
  age: number = 3;
  eat: string = 'grass';
  run () {
    return this.eat;
  }
}

interface Human {
  name: string;
  eat (): void
}

class Asian implements Human {
  constructor (name: string) {
    this.name = name;
  }
  name: string
  eat () {}
  age: number = 10
  sleep (){}
}

// 接口继承接口
interface Man extends Human {
  run(): void;
}

interface Child {
  cry(): void
}

// 同时继承
interface Boy extends Man, Child {}

let boy: Boy = {
  name: '',
  run() {},
  eat() {},
  cry() {}
}

class Auto {
  state = 1
  life: number = 3;
  // private state2 = 1
}

// 接口继承类 - 相当于把类的成员都抽象出来
interface AutoInterface extends Auto {

}

// 实现
class CD implements AutoInterface {
  state = 1;
  life =  33
}

//
class Bus extends Auto implements AutoInterface {

}