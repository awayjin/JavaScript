const vm = require('vm')
const fs = require('fs')

const sandbox = {
  a: 1,
  include: function (name) {
    const template = createTemplate
  }
}
vm.createContext(sandbox)

const templateContext = vm.createContext({
  include: function (name, data) {
    
  }
})

const templateCache = {}
function createTemplate(templatePath) {
  templateCache[templatePath] = vm.runInContext(
    `\`${fs.readFileSync(templatePath, 'utf-8')}\``,
    templateContext
  )
}

const result = vm.runInContext('a += 2', sandbox)
console.log('result:', result)
