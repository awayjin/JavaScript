function demo(method) {
  let res = null;
  switch (method) {
    case 'GET':
      res = [33, 44, 55, 48]
      break
    case 'POST':
      res = [11, 22, 'post']
    default:
      res = ['default data']
  }
  return res
}

module.exports = demo
