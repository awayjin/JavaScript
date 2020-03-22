##  2-9 为什么一定要保证洋葱模型
```
const app = new (require('koa'))
const axios = require('axios')

// 洋葱模型: 1 3 4 2
// 若没加 async-await 1 3 2 4
app.use((ctx, next) => {
  console.log(1)
  const a =  next()
  console.log(2)
})

app.use(async (ctx, next) => {
  console.log(3)

  axios.get('http://codegoing.com')
    .then((res) => {
       // console.log('res:', res.status)
    })
 
    next()
  console.log(4)
})

app.listen(3000)
```

## 路由
开闭原则： 修改关闭 扩展开放

版本号：api query header