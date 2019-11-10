interface Person01 {
  // 有时候我们希望对象中的一些字段只能在创建的时候被赋值，
  // 那么可以用 readonly 定义只读属性
  readonly id: number;
  name: string;
  // 可选属性
  age?: number;
  // 任意属性
  // 字符串索引签名, 用任意字符串来索引 List， 这样 List 就支持多个属性了
  [x: string]: any;
}

// 一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集
let tom: Person01 = {
  // 只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候
  id: 87,
  name: 'Tom',
  age: 24,
  gender: 'male'
}
// tom.id = 44

interface Alarm {
  alert (): void;
}

// 接口的另一个用途，对类的一部分行为进行抽象
let Jim: Person01 = {
  id: 11,
  name: 'Jim'
}

class Door {}

class SecurityDoor extends Door implements Alarm {
  alert () {
    console.log('SecurityDoor alert.')
  }
}

class Car implements Alarm {
  alert(): void {
    console.log('Car alert')
  }
}

interface Light {
  lightOn (): void;
  lightOff (): void;
}

// 一个类可以实现多个接口
class Car01 implements Alarm, Light{
  alert () {}
  lightOff () {}
  lightOn () {}
}

// 接口继承接口
// 接口与接口之间可以是继承关系：
interface LightableAlarm extends Alarm {
  lightOn (): void;
  lightOff (): void;
}

// 接口也可以继承类
class Point01 {
  x: number = 1;
  y: number = 2;
}
interface Point3d extends Point01{
  z: number;
}

let point3d: Point3d = { x: 11, y: 22, z: 3}

// 用接口定义一个对象
interface Person1 {
  name: string;
  age: number;
}
let jin1: Person1 = {
  name: 'jin',
  age: 28
}

