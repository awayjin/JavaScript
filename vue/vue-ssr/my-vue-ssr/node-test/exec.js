const { exec } = require('child_process')
const chokidar = require('chokidar')

const path = require('path')
const log = console.log.bind(console)

// 非常慢的实时构建
chokidar
  .watch(
    path.resolve(__dirname, '../src/')
  )
  .on('change', () => {
    log('生产环境构建中...')
    // 构建生产环境包
    const cmd = 'npm run build'

    exec(cmd, (err) => {
      if (err) {
        console.log('err3', err)
      } else {
        console.log('构建生产环成功!')
      }
    })
  })



