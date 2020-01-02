Page({
  data: {
    message: 'message',
    array: [
      { name: 'jin1' },
      { name: 'away' },
      { name: 'lily' }
    ],
    condition: Math.floor(Math.random() * 3 + 1),
    templateItem: {
      index: 11,
      msg: 'template--emm',
      time: new Date().toLocaleDateString()
    }
  },
  onReady () {
    console.log('小程序初始化')
    this.load()
  },
  load () {
    var object = { a: 11, b: 2 }
    console.log('m3.wxs:', Object.values(object))
  }
})


