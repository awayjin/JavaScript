const util = require('util')

const wx = {
  appId: '11',
  appSecret: '22',
  loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
}


const url = util.format(wx.loginUrl, wx.appId, wx.appSecret, '33')

console.log('url:', url)
console.log(util.format('aa%s:%s', 'foo', 'ddd'))
console.log(util.format([11, 22, 33]))
console.log(util.format(1, 2, 3))