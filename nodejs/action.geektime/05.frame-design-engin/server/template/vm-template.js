const vm = require('vm')
const fs = require('fs')

function createTemplate(content) {
  // console.log('templatePath:', content)
  return vm.runInNewContext(
    `(function (data) {
        with (data) {
          return \`${content}\`
        }
    })`
  )
}
module.exports = createTemplate
