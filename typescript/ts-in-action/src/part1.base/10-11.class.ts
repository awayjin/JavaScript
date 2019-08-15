console.log(
  Array(10).join('-'),
  '11 抽象类',
  Array(10).join('-')
)

// 抽象类只能被继承。
// 抽离处事物的共性，有利于代码的复用和扩展
// 抽象类也可以实现多态--在父类实现一个抽象方法，在多个子类中有不同的实现
// 在程序运行时对不同的对象执行不同的操作，这样就实现了运行时绑定
abstract class Animal {
  eat () {
    console.log('eat abstract')
  }
  abstract sleep(): void
}

// let animal = new Animal();
class Duck extends Animal {
  constructor(public name: string) {
    super()
    this.name = name
  }
  // name: string
  run () {}
  sleep () {
    console.log('抽象方法 Duck')
  }
}
let duck = new Duck('duck - duck')
console.log('duck.eat():')
duck.eat()

class Cat extends Animal {
  sleep() {
    console.log('Cat sleep')
  }
}
let cat = new Cat()

// array
let animals: Animal[] = [duck, cat]
console.log('map sleep:')
// 实现了多态
animals.map(item => item.sleep())

// 链式调用
class WorkFlow {
  step1 () {
    return this
  }
  step2 () {
    return this
  }
}
new WorkFlow().step1().step2()


console.log(
  Array(10).join('-'),
  '10-11 类 class',
  Array(10).join('-')
)

class Dog {
  constructor (name: string) {
    // this.name =name
  }
  public name?: string = 'dog'
  run () {

  }
  private pri() {}
  // 受保护成员
  protected pro () {}
  // 只读属性要被初始化
  readonly  legs: number = 44
  // 静态成员
  static food: string = 'bones'
}

console.log(Dog.prototype)
let dog = new Dog('hi wang')
// dog.pro() // 不能调用，子类可以调用
console.log(dog)
console.log(Object.getPrototypeOf(dog) === Dog.prototype)

// 继承
class Husky extends Dog {
  // 构造函数的参数也可以添加修饰符
  // 将参数自动变为实例的属性
  constructor (name: string, public color: string) {
    super(name)
    this.color = color
    this.pro()
  }
  color2: string = '4'
}

// dog.food
console.log(Dog.food)

// 类的成员修饰符