

async function fun2 () {
  return await fun3()
  // try {
  //   const a =  await fun3()
  //   console.log('a:', a)
  // } catch (e) {
  //   console.log('e:', e)
  // }
}
fun2()
  .then(r => console.log('r:', r))
  .catch(error => console.log('error:', error))

function fun3 () {
  // setTimeout(() => {
  //   throw new Error('error func3')
  // }, 1000)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const r = Math.random()
      if (r < 0.5) {
        reject('error func3')
      } else {
        resolve(r)
      }
    })
  })
}
