const chokidar = require('chokidar')
const fs = require('fs')

const log = console.log.bind(console)

chokidar.watch(
  './src'
).on('change', path => log(`File ${path} has been change`))


// Initialize watcher.


// 不能监听子目录
fs.watch('./src/', function (event, filename) {
  console.log('event is: ' + event);
  if (filename) {
    console.log('filename provided: ' + filename);
  } else {
    console.log('filename not provided');
  }
});
