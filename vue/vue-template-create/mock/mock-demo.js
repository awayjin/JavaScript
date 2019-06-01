function chart(method) {
  let res = null;
  switch (method) {
    case 'GET':
      res = [22, 33, 78, 10, 30, 48]
      break
    case 'POST':
      res = [33, "a", { "a": 443 }]
      break
    default:
      res = ['default data']
  }
  return res
}

module.exports = chart
