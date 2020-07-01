const person = {
  name: 'my name',
  age: 18,
  toJSON () {
    const ran = Math.random() * 10
    if (ran > 5) {
      return ran
    }
    return { 'name': 'look up sky'}
  }
}

console.log(JSON.stringify(person))