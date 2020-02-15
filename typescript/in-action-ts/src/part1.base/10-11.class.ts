
console.log(
  Array(10).join('-'),
  '10 类 class',
  Array(10).join('-')
)

/*------------------------------------------------------------------*/

// “类的成员属性”都是实例属性，而不是原型属性，
// “类的成员方法”都是“原型”方法。
class Greeter {
  greeting: string
  age: number
  sex?: number
  constructor (message: string, age = 30) {
    this.greeting = message // 要初始化
    this.age = age
    // this.sayHi = () => {}
  }
  greet () {
    return 'Hi, ' + this.greeting
  }
}
let g = new Greeter('str', 18)
console.log('10. --类:', g.greet())
console.log('10. --类，实例 new Greeter:', g)
console.log('10. --类，原型 Greeter.prototype:', Greeter.prototype)


/*------------------------------------------------------------------*/

// 类的成员， 类的成员修饰符
//  默认是 public
// private 私有成员。
//   构造函数加上私有属性， 既不能被实例化也不能被继承
// protected 受保护成员 - 只能在类和子类中访问，而不能在实例中访问
// readonly - 只读属性
//   构造函数的参数也可以加修饰符, 作用将参数自动变成实例的属性
// static - 静态成员, 通过类名来调用

class Dog {
  // private constructor (name: string) {
  constructor (name: string, public color?: string) {
    this.name = name
    this.color = color
  }
  public name?: string = 'dog'
  run () {}
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

//



/*------------------------------------------------------------------*/
console.log(
  Array(20).join('-'),
  '11 抽象类',
  Array(20).join('-')
)

// 抽象类只能被继承。
// 抽离处事物的共性，有利于代码的复用和扩展
// 抽象类也可以实现多态--在父类实现一个抽象方法，在多个子类中有不同的实现
// 在程序运行时对不同的对象执行不同的操作，这样就实现了运行时绑定
abstract class Animal {
  eat () {
    console.log('eat abstract')
  }
  // 抽象方法
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

// 多态
class Cat extends Animal {
  sleep() {
    console.log('Cat sleep')
  }
}
let cat = new Cat()

// 定义一个 animals 数组 array
let animals: Animal[] = [duck, cat]
console.log('map sleep:')
// 实现了多态 - 执行不同的实例
animals.map(item => item.sleep())

// 链式调用 - 返回 this
class WorkFlow {
  step1 () {
    return this
  }
  step2 () {
    return this
  }
}
new WorkFlow().step1().step2()