module.exports = {
  // env-开发， prod-生产
  environment: 'dev',
  // environment: 'prod',
  database: {
    dbName: 'island',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root123'
  },
  // auth
  security:{
    secretKey:"abcdefg",
    expiresIn: 60 * 60
  },
  // 微信
  wx: {
    appId: 'wxf9ecb4f7a83b6bc7', // 小程序 appId
    appSecret: '5d9e5f43dfe3613fd945ec2da8c9b3b5', // 小程序 appSecret
    loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
  },
  yushu:{
    detailUrl:'http://t.yushu.im/v2/book/id/%s',
    keywordUrl:'http://t.yushu.im/v2/book/search?q=%s&count=%s&start=%s&summary=%s'
  },
  host: 'http://localhost:3000/',
}