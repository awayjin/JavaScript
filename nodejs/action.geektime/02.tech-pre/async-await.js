
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


void function () {
  // content: Promise { <pending> }
  // result: 44

  const result = async function () {
    var content = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, 500)
    })

    console.log('content:', content)
    return 44
  }()

  setTimeout( () => {
    console.log('result:', result)
  }, 800)
}()


void function () {
  // content: Promise { <pending> }
// result: 44

  // content: 66
// result: Promise { 55 }

  const result = async function () {
    var content = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(66)
      }, 500)
    })

    console.log('content:', content)
    return 55
  }()

  setTimeout( () => {
    console.log('result:', result)
  }, 800)
}()


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

void async function  () {
  // 经过多轮的面试 - await-async
  function interview (round) {
    return new Promise(function (resolve, reject) {
      let random = Math.random()
      if (random > 0.2) {
        resolve(round + ', r:' + random)
      } else {
        reject(new Error(`failed: at ${round} round, random:${random}`))
      }
    })
  }

  try {
    await interview(1)
    await interview(2)
    let last = await interview(3)
    console.log('smile. last:', last)
  } catch (e) {
    console.log('cry. e:', e)
  }


}()