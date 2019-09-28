
// 把抛事件的模块封装起来
// 强调抛事件这种模式更适合底层模块往外传递信息
const course = require('./course')

// 事件监听器
course.on('newLesson', (({ price }) => {
  if (price < 80) {
    console.log('I will buy but cost less 80. price:', price)
  } else {
    console.log('not buy. price:', price)
  }
}))