const { exec, spawn } = require('child_process')

// exec('cat a.js', (err, stdout, stderr) => {
//   if (err) {
//     console.log('it is wrong.')
//     return
//   }
//   console.log(`stdout: ${stdout}`)
//   console.log(`stderr: ${stderr}`)
// })

const ls = spawn('ls', ['-a'], {encoding: 'utf8'})

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`)
})

ls.stderr.on('data', data => {
  console.log(`stderr: ${data}`)
})

ls.on('close', code => {
  console.log(`close: ${code}`)
})