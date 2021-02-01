class Animal {
  name() {
    return `class animal value`
  }
  say() {
    return `I'm ${this.name}`
  }
}

class Dog extends Animal {
  food = 'bone';
  name() {
    return 'Dog'
  }
}

const dog1 = new Dog();
console.log('dog1:', dog1.food)
console.log('dog1:', dog1 instanceof Animal)