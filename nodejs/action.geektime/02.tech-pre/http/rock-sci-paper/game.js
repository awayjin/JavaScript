

// 石头剪刀布游戏
// process.argv 属性返回一个数组，其中包含当启动 Node.js 进程时传入的命令行参数


module.exports = (playAction) => {
  let playArr = ['rock', 'scissors', 'paper']

  if (playArr.includes(playAction) === false) {
    console.log('请输入rock或paper或scissors, 你输入了:', playAction)
    // throw new Error('invalid playerActions')
    return
  }

  console.log('我出了 playAction:', playAction)
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
    return 0
  } else if (
    (computerAction === 'rock' && playAction === 'scissors') ||
    (computerAction === 'paper' && playAction === 'rock') ||
    (computerAction === 'scissors' && playAction === 'paper')
  ) {
    console.log('你输了')
    return -1
  } else {
    console.log('你赢了')
    return 1
  }


}
