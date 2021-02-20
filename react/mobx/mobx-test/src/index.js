import './class-proto';
// import './decorator-demo';
import './observable'

console.log('------------')
// document.write('hello Mobx')
// console.log('Hello MobX')

// Dog.prototype.__proto__ === Animal.prototype

function Animal () {

}
Object.defineProperties(Animal.prototype, {
  name: {
    value() {
      return 'animal value'
    }
  },
  say: {
    value() {
      return `I'm ${this.name()}`;
    }
  }
})

function Dog () {

}


Dog.prototype = Object.create(Animal.prototype)
Dog.prototype = Object.create(Animal.prototype, {
  constructor: {
    value: Dog,
    enumerable: false,
  },
  name: {
    value() {
      return `dog's value`
    }
  }
})

const dog1 = new Dog()
// console.log(dog1 instanceof Animal)
// console.log(dog1.say())
// console.log(dog1.constructor)
