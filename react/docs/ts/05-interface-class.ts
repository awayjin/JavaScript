// primitive values
// Symbol bigInt
// any union-types
// array, tuple元组-元组类型允许表示一个已知元素数量和类型的数组
// 函数和类型推断

// 类 - 封装、继承、多态
// 修饰符 public private protected, readonly, static

// 类和接口

interface IRadio {
  switchRadio (s: string): void;
}

interface IBattery {
  checkStatus(s: number);
}

interface IRadioWithBattery extends IRadio {
  checkStatus(s: number): void;
}

class Car implements IRadio {
  switchRadio(number): void {
    console.log('Car', number)
  }
}

// class Phone implements IRadio, IBattery {
class Phone implements IRadioWithBattery {
  switchRadio(val: string) {
    console.log('Phone', val)
  }
  checkStatus(status: number): void {
    console.log('Phone checkStatus', status)
  }
}

const p1= new Phone()
p1.switchRadio('111 str')
p1.checkStatus(111)
