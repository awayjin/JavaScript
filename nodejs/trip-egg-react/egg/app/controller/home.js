'use strict';

const Controller = require('egg').Controller;
// const info = require('../../utils/info');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // console.log(info());
    console.log(ctx.request.url);
    console.log(ctx.info);
    ctx.body = 'hi, egg app fi';
  }

  async demo() {
    const { ctx } = this;
    // console.log(info());
    console.log(ctx.request.url);
    console.log(ctx.info);
    ctx.body = 'demo page';
  }
}

module.exports = HomeController;
