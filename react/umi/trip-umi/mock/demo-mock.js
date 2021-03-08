export default {
  // 'get /api/demo1': {
  //   code: 0,
  //   message: 'msg 1',
  //   result: [11, 22]
  // },
  // 'get /api/demo2': {
  //   code: 0,
  //   message: '2 msg ',
  //   result: [33, 444]
  // },
  'GET /api/demo1': {
    code: 0,
    message: 'msg',
    result: [
      { a: 1, name: 'n1'},
      { a: 2, name: 'n1'},
    ]
  },
  'get /api/demo2': {
    code: 0,
    message: '2 msg ',
    result: [33, 444]
  },
  'GET /api/demo3': {
    code: 0,
    message: 'msg2',
    result: [
      { a: 3, name: 'l3'},
      { a: 4, name: 'l4'},
    ]
  },
}
