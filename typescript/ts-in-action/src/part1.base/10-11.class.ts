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