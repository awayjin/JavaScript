'use strict';

const { Controller } = require('egg');

class CurlController extends Controller {
  async curlGet() {
    const { ctx } = this;
    const res = await ctx.curl('http://localhost:7001/');
    console.log('res:', res);
    ctx.body = res;
  }
  async curlPost() {
    const { ctx } = this;
    const res = await ctx.curl('http://localhost:7001/login', {
      // 明确告诉 HttpClient 以 JSON 格式处理返回的响应 body
      dataType: 'json',
      method: 'post',
      data: ctx.request.body,
      // 通过 contentType 告诉 HttpClient 以 JSON 格式发送
      contentType: 'json',
    });
    console.log('--> res:', res);
    // const result = res;
    ctx.body = res.data;
    // ctx.body = {
    //   status: result.status,
    //   headers: result.headers,
    //   package: result.data,
    // };
  }
}

module.exports = CurlController;
