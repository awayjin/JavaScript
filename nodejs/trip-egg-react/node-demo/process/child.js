console.log(`子进程${process.pid}`)

process.on('message', msg => {
  console.log(`child on, 来自 master: ${msg}`)
})

process.send('this is a child process.')