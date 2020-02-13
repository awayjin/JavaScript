process.on('message', (str) => {
  console.log('child.js process on message:', str)
  process.send('child msg')
})




// process.on('message', (str) => {
//   console.log('child:', str)
//
//   process.send('hehe')
// })