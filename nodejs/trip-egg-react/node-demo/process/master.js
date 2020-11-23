const { fork } = require('child_process')
const child = fork('./child.js')

child.on('message', msg => {
  console.log(`master on 来自子进程：${msg}`)
})

child.send('from master')