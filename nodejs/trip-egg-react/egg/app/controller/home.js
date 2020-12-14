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

  async newApp() {
    const { ctx, app } = this;
    // const foo = await app.foo();
    // const bar = await app.bar;
    const packageInfo = await app.package();
    // ctx.body = foo + '\r bar:' + bar + '\n package.json:' + packageInfo;
    ctx.body = packageInfo;
  }
  async newCtx() {
    const { ctx } = this;
    const params = ctx.params();
    console.log('params:', params);
    ctx.body = params;
  }
  async newRequest() {
    const { ctx } = this;
    // const { token } = ctx.request;
    const token = ctx.request.token;
    console.log('--token', ctx.request);
    ctx.body = token || 'none';
  }
  async newResponse() {
    const { ctx } = this;
    ctx.response.token = 'set response manual';
    const base64Parse = ctx.helper.base64Encode('newResponse');
    console.log('base64Parse:', base64Parse);
    ctx.body = 'newResponse, base64Parse:' + base64Parse;
  }
}

module.exports = HomeController;
