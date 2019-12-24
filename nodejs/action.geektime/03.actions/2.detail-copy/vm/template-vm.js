const vm = require('vm')
const fs = require('fs')
// const column = require('./mockdata/column')
// const templatePath = `${__dirname}/mockdata/comment.js`
const templatePath = __dirname + '/mockdata/comment.js'
// const data = fs.readFileSync()

// console.log('column:', column)
const templateCache = {}
// const templateContext = vm.createContext({
//   include: function (name, data) {
//     const template = templateCache[name] || createTemplate(name)
//     return template(data)
//   }
// })
const templateContext = {
  include: function (name, data) {
    const template = createTemplate(name)
    return template(data)
  }
}

function createTemplate(templatePath) {
  templateCache[templatePath] = vm.runInNewContext(
    `(function () {
      return \`${fs.readFileSync(templatePath, 'utf-8')}\`
    })`,
    templateContext
  )
  return templateCache[templatePath]
}

console.log('createTemplate(templatePath):', createTemplate(templatePath))

module.exports = createTemplate
