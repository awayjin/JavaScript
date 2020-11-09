const { exec } = require('child_process')

exec('cat a.js', (err, stdout, stderr) => {
  if (err) {
    console.log('it is wrong.')
    return
  }
  console.log(`stdout: ${stdout}`)
  console.log(`stderr: ${stderr}`)
})