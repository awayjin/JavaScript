
// 错误没有被 try-catch 抓取到
// throw 被抛到全局了，不是被包裹在里面
try {
  interview(function (arg) {
    console.log('smile', arg)
  })
} catch (e) {
  console.log('error:', e)
}


interview(function (err, arg) {
  if (err instanceof Error) {
    return console.log('cry:', err)
  }
  console.log('smile:', arg)

  // 函数调函数会形成调用栈
  // try-catch 机制
  // 每个事件循环都是一个全新的调用栈。
  // setTimeout 是在另一个事件循环回调的，所以被抛到全局

  // if (err) {
  //   return console.log('cry at 1st round')
  // }
  //
  //   // 回调地狱
  // interview(function (err) {
  //   if (err) {
  //     return console.log('cry at 2dn round')
  //   }
  //
  //   interview(function (err) {
  //     if (err) {
  //       return console.log('cry at 3rd round')
  //     }
  //     console.log('smile3:', arg)
  //   })
  // })
})

function interview (callback) {
  // setTimeout 把回调函数提交到 event-loop 里
  setTimeout(() => {
    // callback('success')
    if (Math.random() < 0.5) {
      callback(null, 'success')
    } else {
      throw new Error('fail')
      // callback(new Error('fail'))
    }
  }, 500)
}
