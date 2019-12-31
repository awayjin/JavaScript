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
  }
})