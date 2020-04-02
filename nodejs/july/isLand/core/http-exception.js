// http
class HttpException extends Error {
  constructor (msg = 'why wrong', errorCode = 10000, code = 400) {
    super();
    this.msg = msg
    this.errorCode = errorCode
    this.code = code
  }
}

//
class ParameterException extends HttpException {
  constructor (msg = 'why wrong', errorCode = 10000) {
    super();
    this.msg = msg
    this.errorCode = errorCode
    this.code = 400
  }
}

// 成功
class Success extends HttpException {
  constructor (msg, errorCode) {
    super();
    this.code = 201 // 添加操作
    this.msg = msg || 'ok'
    this.errorCode = errorCode || 0
  }
}

module.exports = {
  HttpException,
  ParameterException,
  Success
}