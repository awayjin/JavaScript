const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')

class Auth {
  async m (ctx, next) {
    // 原生 ctx.req
    // koa 封装过 ctx.request
    const userToken = basicAuth(ctx.req)
    // ctx.body = token

    let errorMsg = 'token 不合法'
    // 验证 token 合法性
    if (!userToken || !userToken.name) {
      throw new global.errors.Forbidden(errorMsg)
    }
    try {
      var decode = jwt.verify(userToken.name, global.config.security.secretKey)
    } catch (e) {
      if (e.name == 'TokenExpiredError') {
        errorMsg = 'token 已过期'
      }
      throw new global.errors.Forbidden(errorMsg)
    }

    // uid, scope
    ctx.auth = {
      uid: decode.uid,
      scope: decode.scope
    }
    await next()
  }
}

module.exports = {
  Auth
}