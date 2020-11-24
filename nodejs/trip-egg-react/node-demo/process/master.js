const { fork } = require('child_process')
const child = fork('./child.js')

console.log(`process.pid ${process.pid}`)

child.on('message', msg => {
  console.log(`master on 来自子进程：${msg}`)
})

child.send('from master')