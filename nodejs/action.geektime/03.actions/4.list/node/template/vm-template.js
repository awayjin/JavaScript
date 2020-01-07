const vm = require('vm')
const util = require('util')
function createTemplate(templatePath) {

}

const sandbox = {
  count: 2,
  animal: 'cat'
}
vm.runInNewContext('count += 1; name = "kitty"', sandbox)

console.log('sandbox:', sandbox)
console.log(util.inspect(sandbox))
