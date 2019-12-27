const vm = require('vm')
const fs = require('fs')
// const column = require('./mockdata/column')
// const templatePath = `${__dirname}/mockdata/comment.js`
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
  aa: 11
}

function createTemplate(templatePath) {
  templateCache[templatePath] = vm.runInNewContext(
    `(function (data) {
        aa = aa + 3;
        // with 语句指定 data 对象作为默认对象
        with (data) {
          return \`${fs.readFileSync(templatePath, 'utf-8')}\`
        };
    }); `,
    templateContext
  )
  return templateCache[templatePath]
}

// const templatePath = __dirname + '/mockdata/comment.js'
// console.log('createTemplate(templatePath):', createTemplate(templatePath))

module.exports = createTemplate



