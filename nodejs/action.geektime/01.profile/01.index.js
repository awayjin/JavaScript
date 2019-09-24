console.log(Date)
console.log(Math)
console.log(setTimeout)
console.log(__dirname)
console.log(__filename)
console.log('process.argv:', process.argv)

let playAction = process.argv[process.argv.length - 1]
console.log('playAction:', playAction)
let playArr = ['rock', 'scissors', 'paper']

if (!playArr.includes(playAction)) {
  console.log('请输入rock或paper或scissor')
} else {
  let random = Math.random() * 3
  let computerAction
  if (random > 2) {
    computerAction = 'scissors'
    console.log('电脑出了 剪刀 scissors')
  } else if (random < 1){
    computerAction = 'rock'
    console.log('电脑出了 石头 rock')
  } else {
    computerAction = 'paper'
    console.log('电脑出了 布 paper')
  }

  if (playAction === computerAction) {
    console.log('平局')
  } else if (
    (computerAction === 'rock' && playAction === 'scissors') ||
    (computerAction === 'paper' && playAction === 'rock') ||
    (computerAction === 'scissors' && playAction === 'paper')
  ) {
    console.log('你输了')
  } else {
    console.log('你赢了')
  }

}

