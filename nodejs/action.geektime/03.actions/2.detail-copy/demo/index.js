const user = {
  name: 'detail.<script />'
}

const result = `<h2>${user.name}</h2>`

const vm = require('vm')

console.log(
  vm.runInNewContext('`<h2>${_(user.name)}</h2>`', {
    user,
    _: function (markup) {
      if (!markup) return
      return String(markup)
        .replace(/</g, '&lt;')
    }
  })
)

// console.log(vm.runInNewContext('`<h3>user.name ...</h3>`', { user }))


// 用 ejs 渲染
// let template = `<h2><%= user.name %></h2>`
// ejs.render(template, user)