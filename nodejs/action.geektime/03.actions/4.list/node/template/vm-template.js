const vm = require('vm')
const util = require('util')
function createTemplate(templatePath) {

}

const sandbox = {
  count: 2,
  animal: 'cat'
}
vm.runInNewContext('count += 1; name = "kitty"', sandbox)

console.log('sandbox:', sandbox) // { animal: 'cat', count: 3, name: 'kitty' }
// console.log(util.inspect(sandbox))

const two = vm.runInNewContext('count = 1;c=11;name3 = "hello"')
console.log('two:', two)

const three = vm.runInNewContext('44;"b333"; "b12222cd"; "c3"')
console.log('three:', three)
