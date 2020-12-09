'use strict';

const { Controller } = require('egg');

class UserController extends Controller {
  encode(str = '') {
    return new Buffer(str).toString('base64');
  }
  decode(str = '') {
    return new Buffer(str, 'base64').toString();
  }
  async index() {
    const { ctx } = this;

    // 获取session
    const session = ctx.session.user;
    const zhSession = ctx.session.zh;
    console.log(session);
    console.log(zhSession);

    ctx.cookies.set('zh', '测试', {
      encrypt: true,
    });
    const zh = ctx.cookies.get('zh', {
      encrypt: true,
    });
    // console.log(zh)

    ctx.cookies.set('base64', this.encode('中文base64'));
    const base64 = this.decode(ctx.cookies.get('base64'));

    // ctx.body = 'user index';
    const user = ctx.cookies.get('user');
    await ctx.render('user.html', {
      id: 100,
      name: 'admin',
      data: 'ejs world',
      list: [
        { id: 1, text: 'js' },
        { id: 2, text: 'vue' },
        { id: 3, text: 'react' },
      ],
      user: user ? JSON.parse(user) : null,
      zh,
      base64,
    }, {
      delimiter: '%',
    });
    // const { ctx } = this;
    // ctx.body = 'user index 1';
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
    const detailInfo = await ctx.service.user.detail(ctx.query.id);
    console.log('detailInfo:', detailInfo);
    // console.log('ctx.query:', ctx.query);
    // ctx.body = 'detail';
    // ctx.body = ctx.query.id;
    ctx.body = detailInfo;
  }
  async detail2() {
    const { ctx } = this;
    console.log('detail2 动态传参 ctx.params:', ctx.params);
    ctx.body = ctx.params.id;
  }

  // cookies
  async detail3() {
    const { ctx } = this;

    // 获取 session
    // const session = ctx.session.user;
    // console.log('session', session);

    // get
    const user = ctx.cookies.get('user');
    // 中文加密才能解析
    ctx.cookies.set('zh', '中文', {
      encrypt: true,
    });
    const zh = ctx.cookies.get('zh', {
      encrypt: true,
    });
    console.log('zh:', zh);

    // base64
    ctx.cookies.set('base64', this.encode('中文base64'));
    const base64 = this.decode(ctx.cookies.get('base64'));
    console.log('base64:', base64);

    await ctx.render(
      'user.html',
      {
        data: 'ejs world',
        list: [
          { id: 1, text: 'js' },
          { id: 2, text: 'vue' },
          { id: 3, text: 'react' },
        ],
        user: user ? JSON.parse(user) : null,
        zh,
        base64,
      }
    );
  }
  // login
  async login() {
    const { ctx } = this;
    const { body } = ctx.request;
    ctx.cookies.set('user', JSON.stringify(body), {
      maxAge: 1000 * 60 * 10,
      httpOnly: false,
    });
    console.log('body:', body);

    // 保存 session
    ctx.session.user = body;

    ctx.body = {
      status: 200,
      data: body,
    };
  }
  async logout() {
    const { ctx } = this;
    ctx.cookies.set('user', null);
    // 清除 session
    ctx.session.user = null;
    ctx.body = {
      status: 200,
      data: 'logout',
    };
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
