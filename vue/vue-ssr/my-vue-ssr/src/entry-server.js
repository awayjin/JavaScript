import { createApp } from './main.js'
const { app, router } = createApp()

// 设置服务器端 router 的位置
// router.push(context.url)

app.$mount('#app')

export default context => {
  const { app } = createApp()

  return app
}
