(function () {
  console.log(Array(40).fill('-').join(''))

  function log(Class) {
    return (...args) => {
      console.log('args', args)
      return new Class(...args)
    }
  }

  // 类装饰器
  @log
  class Animal {
    constructor (name, age) {
      this.name = name;
      this.age = age;
    }
  }
  const cat = new Animal('hello cat', 2);
  console.log(cat)


})();

(function () {
  console.log(Array(40).fill('-').join(''))

  // 传入自定义参数
  // 如果想为装饰器@log传入自定义参数，则需要在log中返回一个本身就是装饰器的函数:
  function log(def) {
    return (Class) => {
      return (...args) => {
        console.log('args2:', args)
        console.log('def:', def)
        return new Class(...args)
      }
    }
  }

  // 类装饰器
  @log('define param')
  class Animal {
    constructor (name, age) {
      this.name = name;
      this.age = age;
    }
  }
  const dog = new Animal('hello dog', 3);
  console.log(dog)
})();

// function log (Class) {
//   return (...args) => {
//     console.log('args:', args)
//     return new Class(...args)
//   }
// }
//
// function fn(...args) {
//   console.log('fn:', ...args, 333)
//   return function decorator(Class) {
//     return (...args) => {
//       return new Class(...args)
//     }
//   }
// }
// // fn(33, [11, 22])
//
// // @fn('fn-test')
// // @log
// class Animal {
//   constructor (name, age) {
//     this.name = name;
//     this.age = age;
//   }
// }
//
// // const duck = new Animal('hello duck 3', 16)
// // duck.age = 200
// // console.log('animal', duck.age)
// // console.log(duck.age)
//
// // @fn('dd')
// // class Demo {}
//
// function readonly (target, name, descriptor) {
//   console.log('--> 1. readonly target:', target, ', name:', name, ', descriptor:', descriptor)
//   // console.log('descriptor.value', descriptor.value)
//   descriptor.writable = false
//   return descriptor
// }
//
//
// function log2(target, name, descriptor) {
//   const original = descriptor.value
//   console.log('4. descriptor:', descriptor.value)
//   if (typeof original === 'function') {
//     descriptor.value = function(...args) {
//       console.log(`3. log for args: ${args}`)
//       try {
//         return original.apply(this, args)
//       } catch (e) {
//         console.log(`Error: ${e}`)
//
//         throw e
//       }
//     }
//   }
//
//   return descriptor
// }
// class Animal2 {
//   constructor (name) {
//     this.name = name
//   }
//
//   @readonly age = 20
//
//   @log2
//   sayHello(name) {
//     console.log(`2. Hello ${name}, I'm ${this.name}`)
//   }
// }
// const cat = new Animal2('class method');
// // cat.age = 110;
// // console.log('Animal2', cat.age)
// cat.sayHello('Jack')