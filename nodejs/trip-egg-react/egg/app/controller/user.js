const { Controller } = require('egg');

class UserController extends Controller {
  async index() {
    const { ctx } = this
    ctx.body = 'user create 1'
  }
  async demo() {
    const { ctx } = this
    ctx.body = 'user demo'
  }
}

module.exports = UserController