export const a = 4
export const b = 5
export const c = 6
export let d = 121
export default { d, a, b }


function foo () {
  return 33;
}

async function foo2 () {
    return await 33;
}

function* foo3() {
  yield 33;
  yield 44;
  // return yield 99;
}

// 异步生成器函数
async function* foo4() {
   yield 44;
  return await 55
}