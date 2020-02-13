const cp = require('child_process')
const child_process = cp.fork(__dirname + '/child.js')
child_process.send('parent msg')
child_process.on('message', (str) => {
  console.log('master.js child_process on message:', str)
})











// const cp = require('child_process')
//
// const child_process = cp.fork(__dirname + '/child.js')
//
// child_process.send('haha')
//
// child_process.on('message', (str) => {
//   console.log('parent:', str)
// })