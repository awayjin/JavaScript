
// async 是 Promise 的语法糖
// console.log(async function f () {
//   // return 33
//   throw new Error(44)
// }())
//
// console.log(function () {
//   return new Promise(function (resolve, reject) {
//     // resolve(33)
//     reject(new Error(44))
//   })
// }())


!function () {

  const result = async function () {
    try {
      var content = await new Promise(function (resolve, reject) {
        setTimeout(() => {
          // resolve(66)
          reject(new Error(77))
        }, 500)
      })
    } catch (e) {
      console.log('error:', e.message)
    }

    console.log('content:', content)
    return 55
  }()

  setTimeout(() => {
    console.log('result:', result)
  }, 800)
}()


// content: Promise { <pending> }
// result: 44


// content: 66
// result: Promise { 55 }

// try-catch 只能捕捉到调用栈以上的函数
try {
  func()
} catch (e) {
  console.log('e:', e)
}

function func () {
  // 不能捕捉到
  setTimeout(function () {
    throw new Error('func error-')
  })
}