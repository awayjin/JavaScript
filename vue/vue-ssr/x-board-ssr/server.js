// https://juejin.im/post/5b98e5875188255c8320f88a#heading-8

const Vue = require('vue')

const Koa = require('koa')
const app = new Koa()

// crate renderer
const renderer = require('vue-server-renderer').createRenderer()

// 添加一个中间件来处理所有请求
app.use(async (ctx, next) => {
  const vm = new Vue({
    data: {
      title: 'ssr tpl',
      url: ctx.url
    },
    template: `<div>
      <p>, title: {{ title }}</p>
      --访问的 URL 是: {{ url }}
    </div>`
  })

  // 把 Vue 实例渲染为 HTML
  renderer.renderToString(vm, (err, html) => {
    if (err) {
      ctx.res.status(500).end('Internal Server Error.by away')
      // return
    }
    ctx.body = html
  })

  // ctx.response.type = 'text/html';
  // ctx.response.body = '<h1>Hello, koa2!</h1>';
})

const port = process.env.NODE_ENV || 3009
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})