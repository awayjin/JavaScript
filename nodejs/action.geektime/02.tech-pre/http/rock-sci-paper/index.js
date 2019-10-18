const http = require('http')
const fs = require('fs')
const url = require('url') // url
const queryString = require('querystring') // 查询字符串

const game = require('./game.js') // game

const port = process.env.PORT || 3000

let gameAction = null // 电脑
let playActionCn = null // 玩家
let playWon = 0 // 赢的次数

let playerLastAction = null
let sameCount = 0

let transferChinese = function (playAction, gameResult) {
  if (playAction === 'rock') {
    playActionCn = '石头'
    if (gameResult === 0) {
      gameAction = '石头'
    } else if (gameResult === 1) {
      playWon++

      gameAction = '剪刀'
    } else {
      gameAction = '布'
    }
  } else if (playAction === 'scissors') {
    playActionCn = '剪刀'
    if (gameResult === 0) {
      gameAction = '剪刀'
    } else if (gameResult === 1) {
      playWon++

      gameAction = '布'
    } else {
      gameAction = '石头'
    }
  } else {
    playActionCn = '布'
    if (gameResult === 0) {
      gameAction = '布'
    } else if (gameResult === 1) {
      playWon++

      gameAction = '石头'
    } else {
      gameAction = '剪刀'
    }
  }

}

http
  .createServer(function (req, res) {

    // 处理 icon
    if (req.url === '/favicon.ico') {
      res.writeHead(200)
      res.end()
      return
    }

    let parseURL = url.parse(req.url) // 处理 URL

    // console.log('queryString:', queryString)
    // console.log('parseURL:', parseURL)

    if (parseURL.pathname === '/game') {
      let query = queryString.parse(parseURL.query) // 处理查询字符串

      let playAction = query.action // 玩家所出
      const gameResult = game(playAction)

      if (playAction === 'clear') {
        sameCount = 0
        playWon = 0
        playerLastAction = null
        res.writeHead(200)
        res.end('')
        return
      }

      transferChinese(playAction, gameResult) // 转换成中文

      if (playWon > 3 || sameCount === 9){
        res.writeHead(500)
        res.end('你赢了3次或作弊，不和你玩了。')
        return
      }

      if (playerLastAction && playAction === playerLastAction) {
        sameCount++
      } else {
        sameCount = 0
      }
      playerLastAction = playAction


      if (sameCount >= 3) {
        res.writeHead(400)
        res.end('你作弊。。')
        sameCount = 9
        return
      }


      res.writeHead(200)
      if (gameResult === 0) {
        res.end('平局。你出了:' + playActionCn + ', 电脑出了:' + gameAction + ', playWon:' + playWon)
      } else if (gameResult === 1) {
        res.end('你赢了。你出了:' + playActionCn + ', 电脑出了:' + gameAction + ', playWon:' + playWon)
      } else {
        res.end('你输了。你出了:' + playActionCn + ', 电脑出了:' + gameAction + ', playWon:' + playWon)
      }


      // res.end(playAction)
      return
    }


    // 返回 index.html
    if (req.url === '/') {
      res.writeHead(200)
      fs.createReadStream(__dirname + '/index.html').pipe(res)
    }
    // console.log('req.url:', req.url)
    // res.end('ok')
  })

  .listen(port, () => {
    console.log(`Server at http://localhost:${port}`)
  })