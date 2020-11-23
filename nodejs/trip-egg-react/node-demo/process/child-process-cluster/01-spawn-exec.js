const { spawn, exec } = require('child_process');
const { stdout, stderr } = require('process');

const ls = spawn('ls', ['-a'])

// ls.stdout.on('data', (data) => {
//   console.log(`stdout data: ${data}`);
// })

// ls.stderr.on('data', (data) => {
//   console.log(`stderr d: ${data}`);
// })

// ls.on('close', (code) => {
//   console.log(`child process exited with code: ${code}`);
// })

// 创建文件并追加内容  
exec('rm demo.js && echo var a = 3 >> demo.js ', (error, stdout, stderr) => {
// exec('echo var a = 3 >> demo.js ', (error, stdout, stderr) => {
  console.log(`error: ${error}`);
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
})