const glob = require('glob')


// let start = performance.now()
// let end = performance.now()
// console.timeEnd('performance 耗时:', end - start)

async function syncGlob () {
  let result
  console.time('glob')
// 阻塞I/O - 同步递归读取所有文件和文件夹
  result = await glob.sync(__dirname + '/**/*.js')
  // console.log('result:', result)
  console.timeEnd('glob')

  console.log('1 + 1:', 1 + 1)

  return Promise.resolve(result)
}
// syncGlob().then(data =>  console.log(data))

// let result
// console.time('glob')
// // 阻塞I/O - 同步递归读取所有文件和文件夹
// result =  glob.sync(__dirname + '/**/*.js')
// // console.log('result:', result)
// console.timeEnd('glob')
// console.log('后面执行 1 + 1:', 1 + 1) //

// 非阻塞I/O - 回调
async function asyncGlob () {
  let result = null
  console.time('glob')
  // 异步 I/O
  // result = await glob(__dirname + '/**/*', function (err, files) { // 同步
  glob(__dirname + '/**/*', function (err, files) { // 同步
    return result = files
    // console.log(files)
    console.log('got result.')
  })
  console.log('result:', result) // null
  console.timeEnd('glob')

  console.log('先执行 1 + 1:', 1 + 1)

}
asyncGlob()

