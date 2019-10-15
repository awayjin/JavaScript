let promise = new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve('resolve..')
      // resolve()
    }, 500);

    setTimeout(() => {
      // reject(new Error('reject...'))
      reject('reject...')
    }, 400)
})

// 如果是 pending 转为 reject 需要 catch或then 错误处理，
// console.log('1:', promise)
// console.log('1:', promise.catch((e) => console.log(e)))
console.log('1:', promise.then(
  (data) => console.log('data', data),
  (e) => console.log('e:', e))
)

setTimeout(() => {
  console.log('2:', promise)
}, 800)

setTimeout(() => {
  console.log('3:', promise)
}, 1200)


void function () {
  // then-catch 里再返回 promise
  var promise = new Promise(function (resolve, reject) {
    // resolve('resolve')
    reject('reject')
  })

  promise
    .then(function (data) {
      console.log('data:', data)
    }, err1 => {
      console.log('err1:', err1)
      // throw new Error('1 err')
      return new Promise(function (resolve, reject) {
        resolve('resolve2')
        // reject('reject2')
      })
    })
    .then(data2 => {
      console.log(data2)
    })
    .catch(err => {
      console.log('err2:', err)
    })
}()

// 经过多轮的面试
void function () {
  // 经过多轮的面试 - promise
  function interview (round) {
    return new Promise(function (resolve, reject) {
      let random = Math.random()
      if (random > 0.1) {
        resolve(round + ', r:' + random)
      } else {
        reject(new Error(`failed: at ${round} round, random:${random}`))
      }
    })
  }

  interview(1)
    .then(() => {
      return interview(2)
    })
    .then(() => {
      return interview(3)
    })
    .then((data) => {
      console.log('smile, data:', data)
    })
    .catch((err) => {
      console.log('cry err:', err)
    })

}()