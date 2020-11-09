'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg app fi';
  }

  async demo() {
    const { ctx } = this;
    ctx.body = 'demo page';
  }
}

module.exports = HomeController;
