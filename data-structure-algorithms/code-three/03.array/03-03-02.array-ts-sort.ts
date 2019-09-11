const friends = [
  { name: 'John', age: 30 },
  { name: 'Ana', age: 20 },
  { name: 'jin', age: 21 },
  { name: 'Chris', age: 25 }, // ES2017 允许存在尾逗号
]
// @ts-check
interface Person {
  name: string,
  age: number
}

function comparePerson(a: Person, b: Person) {
  if (a.age  < b.age) {
    return -1
  }
  if (a.age > b.age ) {
    return 1
  }

  return 0
}
console.log(friends.sort(comparePerson))