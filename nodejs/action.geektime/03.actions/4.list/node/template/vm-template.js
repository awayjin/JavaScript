const vm = require('vm')
const fs = require('fs')

function createTemplate(templatePath) {
  return vm.runInNewContext(
    `(function (data) {
        with (data) {
          return \`${fs.readFileSync(templatePath, 'utf-8')}\`
        }
    })`
  )
}
module.exports = createTemplate
