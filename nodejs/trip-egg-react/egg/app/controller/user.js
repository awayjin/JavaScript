'use strict';

const { Controller } = require('egg');

class UserController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'user index 1';
  }
  async lists() {
    const { ctx } = this;
    // eslint-disable-next-line no-unused-vars
    const r = await new Promise((resolve, reject) => {
      setTimeout(() => {
        const random = (Math.random() * 10 % 2);
        resolve(random);
      }, 1500);
    });
    console.log('r', r);
    ctx.body = [
      {
        text: 'user demo',
        // r,
      },
    ];
  }
  async detail() {
    const { ctx } = this;
    console.log('ctx.query:', ctx.query);
    // ctx.body = 'detail';
    ctx.body = ctx.query.id;
  }
  async detail2() {
    const { ctx } = this;
    console.log('detail2 动态传参 ctx.params:', ctx.params);
    ctx.body = ctx.params.id;
  }
  // add
  async add() {
    const { ctx } = this;
    console.log('body:', ctx.request.body);
    // 定义创建接口的请求参数规则
    const rules = {
      name: 'string',
      age: 'number',
    };
    // 校验 `ctx.request.body` 是否符合我们预期的格式
    // 如果参数校验未通过，将会抛出一个 status = 422 的异常
    ctx.validate(rules, ctx.request.body);
    ctx.body = {
      status: 200,
      body: ctx.request.body,
      me: 'user add',
    };
  }
}

module.exports = UserController;
