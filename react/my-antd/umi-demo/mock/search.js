// mock
export default {
  // 'GET /api/getList': {
  //   lists: ['a', 'b', 'c', 'mock']
  // }
  // func
  'GET /api/getList': (req, res) => {
    console.log('-----> req:', req)
    setTimeout(() => {
      res.json({
        lists: Array(2).fill(req.query.value)
      })
    }, 1500)
  }
}
