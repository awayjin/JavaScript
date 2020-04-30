const { HttpException } = require('../core/http-exception')

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

    const isHttpException = e instanceof HttpException
    const isDev = config.environment === 'dev'
    // 开发环境，未知异常被抛出
    if (isDev && !isHttpException) {
      throw e
    }

    console.log('\033[40;32m isHttpException \033[0m:', isHttpException)
    console.log('\033[40;32m exception 成功也抛出异常 \033[0m:', e)
    // 已知异常
    if (isHttpException) {
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
