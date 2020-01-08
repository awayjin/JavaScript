const vm = require('vm')
const fs = require('fs')

const tempaltePath =  '/../index.html'
function createTemplate(templatePath) {
  return vm.runInNewContext(
    `(function (data) {
        with (data) {
          return \`${fs.readFileSync(templatePath, 'utf-8')}\`
        }
    })`
  )
}
// const template = createTemplate(__dirname + tempaltePath)
// const data = {
//   id: 2,
//   articles: [11, 22, 33],
//   column_title: '模板字符串改造为模板引擎'
// }
// console.log(template(data))

module.exports = createTemplate

// console.log(fs.readFileSync(__dirname + `${tempaltePath}`, 'utf-8'))
