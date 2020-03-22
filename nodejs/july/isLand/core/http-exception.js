class HttpException extends Error {
  constructor (msg = 'why wrong', errorCode = 10000, code = 400) {
    super();
    this.msg = msg
    this.errorCode = errorCode
    this.code = code
  }
}

class ParameterException extends HttpException {
  constructor (msg = 'why wrong', errorCode = 10000) {
    super();
    this.msg = msg
    this.errorCode = errorCode
    this.code = 400
  }
}

module.exports = {
  HttpException,
  ParameterException
}