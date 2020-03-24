const { HttpException, ParameterException } = require('../core/http-exception')

// 全局异常处理中间件
const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (e) {
    // 已知错误
    // if (e.errorCode) {
    //   ctx.body = {
    //     message: e.message,
    //     error_code: e.errorCode,
    //     request: e.requestUrl
    //   }
    //   ctx.status = 400
    // }

    // 开发环境，抛出异常
    if (config.environment === 'dev') {
      throw e
    }

    // 已知异常
    if (e instanceof HttpException) {
      ctx.body = {
        message: e.msg,
        error_code: e.errorCode,
        request: `${ctx.method} ${ctx.path}`
      }
      ctx.status = e.code
    }
  }
}

module.exports = catchError