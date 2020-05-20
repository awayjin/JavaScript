// http 请求异常
class HttpException extends Error {
  constructor (message = '请求错误', errorCode = 10000, status = 400) {
    super()
    this.message = message
    this.errorCode = errorCode
    this.status = status
  }
}

module.exports = {
  HttpException
}