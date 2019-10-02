// const EventEmitter = require('events').EventEmitter
// const { EventEmitter } = require('events')
const EventEmitter = require('events')

// 把抛事件的模块封装起来
// 强调抛事件这种模式更适合底层模块往外传递信息
class Course extends EventEmitter {
  constructor () {
    super()
    setInterval(() => {
      this.emit('newLesson', {
        price: Math.random() * 100,
        name: '触发事件'
      })
    }, 2000)
  }
}

module.exports = new Course