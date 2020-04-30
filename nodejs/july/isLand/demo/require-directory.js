const app = new (require('koa'))
const requireDirectory = require('require-directory')

// console.log(requireDirectory(module, './'))

const hash = requireDirectory(module, './routes', {
  visit: (obj) => {
    console.log('obj:', obj)
    console.log('obj.routes:', obj.routes)
    app.use(obj.routes())
  }
})

console.log('hash:', hash)

app.listen(3000)