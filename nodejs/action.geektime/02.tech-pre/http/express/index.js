const http = require('http')
const fs = require('fs')
const url = require('url') // url
const queryString = require('querystring') // 查询字符串
const express = require('express')
const app = express()

const game = require('./game.js') // game

const port = process.env.PORT || 3000

let gameAction = null // 电脑
let playActionCn = null // 玩家
let playerWinCount = 0 // 赢的次数
let playerWon = 0 //

let playerLastAction = null
let sameCount = 0


app.get('/favicon.ico', (req, res) => {
  // res.writeHead(200)
  // res.end()
  // return
  res.status(200)
})


app.get('/game',
  (req, res, next) => {

    // let parseURL = url.parse(req.url) // 处理 URL
    // let query = queryString.parse(parseURL.query) // 处理查询字符串
    let query = req.query // 处理查询字符串

    let playAction = query.action // 玩家所出
    const gameResult = game(playAction)

    if (playAction === 'clear') {
      sameCount = 0
      playerWinCount = 0
      playerLastAction = null
      // res.writeHead(200)
      // res.end('')
      res.status(200)
      res.send()
      return
    }

    if (playAction === 'rock') {
      playActionCn = '石头'
      if (gameResult === 0) {
        gameAction = '石头'
      } else if (gameResult === 1) {
        // playerWinCount++
        playerWon = true

        gameAction = '剪刀'
      } else {
        gameAction = '布'
      }
    } else if (playAction === 'scissors') {
      playActionCn = '剪刀'
      if (gameResult === 0) {
        gameAction = '剪刀'
      } else if (gameResult === 1) {
        // playerWinCount++
        playerWon = true
        gameAction = '布'
      } else {
        gameAction = '石头'
      }
    } else {
      playActionCn = '布'
      if (gameResult === 0) {
        gameAction = '布'
      } else if (gameResult === 1) {
        // playerWinCount++
        playerWon = true

        gameAction = '石头'
      } else {
        gameAction = '剪刀'
      }
    }

    if (playerWinCount >= 3 || sameCount === 9){
      // res.writeHead(500)
      // res.end('你赢了3次或作弊，不和你玩了。')
      res.status(500)
      res.send('你赢了3次或作弊，不和你玩了。')
      return
    }

    if (playerLastAction && playAction === playerLastAction) {
      sameCount++
    } else {
      sameCount = 0
    }
    playerLastAction = playAction

    res.gameResult = gameResult
    next()
  },
  (req, res) => {

    const gameResult = res.gameResult

    if (sameCount >= 3) {
      // res.writeHead(400)
      // res.end('你作弊。。')
      res.status(400)
      res.send('你作弊。。')
      sameCount = 9
      return
    }

    // 玩家赢了，计数加1
    if (playerWon === true) {
      playerWinCount++
    }


    // res.writeHead(200)
    res.status(200)
    if (gameResult === 0) {
      res.send('平局。你出了:' + playActionCn + ', 电脑出了:' + gameAction + ', playerWinCount:' + playerWinCount)
    } else if (gameResult === 1) {
      res.send('你赢了。你出了:' + playActionCn + ', 电脑出了:' + gameAction + ', playerWinCount:' + playerWinCount)
    } else {
      res.send('你输了。你出了:' + playActionCn + ', 电脑出了:' + gameAction + ', playerWinCount:' + playerWinCount)
    }
  }
)


app.get('/', (req, res) => {
  // res.writeHead(200)
  // res.send(fs.readFileSync(__dirname + '/index.html')) // Buffer，不是字符串，转换为下载的功能
  // res.send(fs.readFileSync(__dirname + '/index.html', 'utf-8'))
  // fs.createReadStream(__dirname + '/index.html').pipe(res)
  res.send(fs.readFileSync(__dirname + '/index.html', 'utf-8'))
})

app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`)
})