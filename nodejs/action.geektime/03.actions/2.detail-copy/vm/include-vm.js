const vm = require('vm')

// template
const templateMap = {
  templateA: '`<h2>${include("templateB")}</h2>`',
  templateB: '`<p>ha ha</p>`'
  // templateB: fs.readFileSync('templateB')
}
const templateContext = {
  include: function f (name) {
    return templateMap[name]
  }
}
Object.keys(templateMap).forEach(key => {
  const temp = templateMap[key] // 避免递归调用作暂存
  templateMap[key] = vm.runInNewContext(`
    (function () {
      return ${temp}
    })
  `, templateContext)
})
console.log('templateMap:', templateMap['templateA']())

const templateResult = vm.runInNewContext(`(function () {
  return ${templateMap['templateA']}
})`, {
  include: function () {
    return templateMap['templateA']
  }
})
// console.log('templateResult:', templateResult['templateA']())
