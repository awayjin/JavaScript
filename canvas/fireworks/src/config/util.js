/**
 * Created by jinwei on 2018/3/10.
 */
const util = {
  random (min = 0, max) {
    let random = Math.random()
    return min + (max - min) * random
  },
  extend (origin, ...arg) {
    arg.forEach(item => {
      for (let key in item) {
        origin[key] = item[key]
      }
    })
    return origin
  }
}

export default util
