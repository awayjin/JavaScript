const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')

class Auth {
  constructor (level) {
    this.level = level || 1
    Auth.USER = 8
    Auth.ADMIN = 16
    Auth.SUPER_ADMIN = 32
  }

  get m () {
    return async (ctx, next) => {
      // 原生 ctx.req
      // koa 封装过 ctx.request
      const userToken = basicAuth(ctx.req)
      // ctx.body = token
      console.log('userToken:', userToken)

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

      console.log('this.level:', this)
      console.log('decode.scope:', decode.scope)
      console.log('decode:', decode)
      // 权限分级
      if (decode.scope < this.level) {
        errorMsg = '权限不足'
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

  // 验证 token
  static verifyToken (token) {
    try {
      jwt.verify(token, global.config.security.secretKey)
      return true
    } catch (e) {
      return false
    }

  }
}

module.exports = {
  Auth
}