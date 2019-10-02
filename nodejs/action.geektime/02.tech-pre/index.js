const game = require('./game')

// let playAction = process.argv[process.argv.length - 1]

// const result = game(playAction)
// console.log('result:', result)

let count = 0
process.stdin.on('data', e => {
  const playAction = e.toString().trim()
  const result = game(playAction)

  if (result === 1) {
    count++
    console.log(`你赢了 ${count} 次`)
  }

  if (count === 3) {
    console.log(`你赢了 ${count} 次, 我不玩了，退出！`)
    process.exit() // 退出
  }
})