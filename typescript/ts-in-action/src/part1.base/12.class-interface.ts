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

// 接口继承
interface Man extends Human {
  run(): void
}

interface Child {
  cry(): void
}

interface Boy extends Man, Child {}

let boy: Boy = {
  name: '',
  run() {},
  eat() {},
  cry() {}
}

class Auto {
  state = 1
  // private state2 = 1
}
interface AutoInterface extends Auto {

}
// class Cd implements AutoInterface {
//   state1 = 1
// }
class Bus extends Auto implements AutoInterface {

}