const app = new (require('koa'))
const axios = require('axios')

// 1 3 4 2
app.use(async (ctx, next) => {
  console.log(1)
  const a = await next()
  console.log('a:', a)
  // 通过 async-await 来保证能获取到其他中间的值
  console.log('ctx.body:', ctx.body)
  console.log(2)
})

app.use(async (ctx, next) => {
  console.log(3)
  // next()


  axios.get('http://codegoing.com')
    .then((res) => {
      console.log('res:', res.status)
    })

  const fs = require('fs')
  const html = await fs.readFileSync(`${__dirname}/index.html`, 'utf-8')
  ctx.body = html

  console.log(4)
  return 'hello July'
})


// async 返回值是 Promise
async function f1() {
  const value = await axios.get('http://codegoing.com')
    .then((res) => {
      return res
    })
    .catch((err) => {
      return err
    })
  // console.log('value:', value.status)
  return value.status
  // return  new Promise((resolve, reject) => {
  //   axios.get('http://codegoing.com')
  //     .then((res) => {
  //       resolve(res)
  //     })
  //     .catch((err) => {
  //       reject(err)
  //     })
  // })
}

console.log(1);
(async function () {
  console.log(2)
  const value = await f1()
  console.log('f1:', value)
  // console.log('f1:',   f1())
  console.log(3)

})()
console.log(4)


app.listen(3000)