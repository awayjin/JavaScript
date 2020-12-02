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
}

module.exports = UserController;
