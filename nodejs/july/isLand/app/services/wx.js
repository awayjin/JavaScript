const util = require('util')
const axios = require('axios')
const { User } = require('../models/user')
const { generateToken } = require('../../core/util')
const { Auth } = require('../../middlewares/auth')

class WXManger {
  static async codeToToken (code) {
    const {
      appId,
      appSecret,
      loginUrl
    } = global.config.wx

    const url = util.format(loginUrl, appId, appSecret, code)

    const result = await axios.get(url)
    if (result.status !== 200) {
      throw new global.errors.AuthFailed('openid 获取失败')
    }
    const errcode = result.data.errcode
    const errmsg = result.data.errmsg
    console.log('app/services/wx.js result.data:', result.data)
    // if (errcode !== 0) { // 微信文档有点问题
    if (errcode) {
      throw new global.errors.AuthFailed(`openid 获取失败: ${errcode}, errmsg: ${errmsg}`)
    }
    // openid
    // 档案 user uid openid 长

    let user = await User.getUserByOpenId(result.data.openid)
    if (!user) {
      user = await User.registerByOpenid(result.data.openid)
    }
    return generateToken(user.id, Auth.USER)

  }
}

module.exports = {
  WXManger
}