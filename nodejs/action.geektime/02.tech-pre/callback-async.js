// try {
//   interview(function (arg) {
//     console.log('smile', arg)
//   })
// } catch (e) {
//   console.log('error:', e)
// }
interview(function (err, arg) {
  if (err instanceof Error) {
    return console.log('cry:', err)
  }
  console.log('smile:', arg)

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
      // throw new Error('fail')
      callback(new Error('fail'))
    }
  }, 500)
}
