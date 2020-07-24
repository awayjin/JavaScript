const express = require('express')
const app = express()

// Express 是基于 callback 来组合业务逻辑。
// Callback 有两大硬伤，一是不可组合，二是异常不可捕获。

app.get('/',
  (req, res, next) => {
    console.log('onion 1')
    res.send('body')
    next()
    console.log('onion 2')
    console.log('res.play:', res.play)
  },
  async function (req, res, next) {
    await new Promise((resolve, rejected) => {
      setTimeout(() => {
        console.log(3)
        res.play = true
        console.log(4)
        resolve()
      })
    })
  }
)

// const myLogger = (req, res, next) => {
//   console.log('my logger 3')
//   next()
//   console.log('my logger 4')
// }
// app.use(myLogger)

app.listen(4000)