// http
class HttpException extends Error {
  constructor (msg = 'why wrong', errorCode = 10000, code = 400) {
    super();
    this.msg = msg
    this.errorCode = errorCode
    this.code = code
  }
}

// 参数错误
class ParameterException extends HttpException {
  constructor (msg = 'why wrong', errorCode = 10000) {
    super();
    this.msg = msg || '参数错误'
    this.errorCode = errorCode
    this.code = 400
  }
}

// 成功
// 201 Created 是一个代表成功的应答状态码，表示请求已经被成功处理，并且创建了新的资源
class Success extends HttpException {
  constructor (msg, errorCode) {
    super();
    this.code = 201 // 添加操作
    this.msg = msg || 'ok'
    this.errorCode = errorCode || 0
  }
}

// 授权失败
class AuthFailed extends HttpException {
  constructor (msg, errorCode) {
    super()
    this.code = 401
    this.msg = msg || '授权失败'
    this.errorCode = errorCode || '10004'
  }
}

// 禁止访问
class Forbidden extends HttpException {
  constructor (msg, errorCode) {
    super();
    this.code = 403
    this.msg = msg || '禁止访问'
    this.errorCode = errorCode || '10006'
  }
}

// 喜欢
class LikeError extends HttpException {
  constructor (msg, errorCode) {
    super();
    this.code = 403
    this.msg = msg || '你已经点赞过'
    this.errorCode = errorCode || '60001'
  }
}


// 不喜欢
class DislikeError extends HttpException {
  constructor (msg, errorCode) {
    super();
    this.code = 403
    this.msg = msg || '你取消了点赞'
    this.errorCode = errorCode || '60002'
  }
}
module.exports = {
  HttpException,
  ParameterException,
  Success,
  AuthFailed,
  LikeError,
  DislikeError,
  Forbidden
}