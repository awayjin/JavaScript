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
  templateMap[key] = vm.runInNewContext(
    `
    (function () {
      return ${temp}
    })
  `,
    templateContext
  )
})
console.log('templateMap:', templateMap['templateA']())

const template = '`${include(" template-a11")}`'
const templateResult = vm.runInNewContext(
  // '`(function() { <h2>${include("  aa333")}</h2>)}`',
  `(function () {
    return ${template}
  })`,
  {
    include: function f (name) {
      return '433' + name
    }
  }

)
console.log('templateResult:', templateResult())
