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
    const { ctx, app } = this;
    // console.log('mysql:', app.mysql);
    // const sql = `select * from user`;
    const userTable = await app.mysql.select('user');
    console.log('userTable:', userTable);

    // 获取session
    const userSession = ctx.session.user;
    // const zhSession = ctx.session.zh;
    console.log('--> userSession:', userSession);
    // console.log('zhSession:', zhSession);

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
    // const r = await new Promise(resolve => {
    //   setTimeout(() => {
    //     const random = (Math.random() * 10 % 2);
    //     resolve(random);
    //   }, 1500);
    // });
    // console.log('r', r);
    // ctx.body = '22';
    console.log('ctx.model:', ctx.model);
    console.log('ctx.model.User:', ctx.model.User);
    const res = await ctx.model.User.findAll({
      // where: {
      //   id: 2,
      // },
      limit: 3,
      offset: 1,
    });
    console.log('res:', res);
    ctx.body = [
      {
        text: 'user demo',
        data: res,
      },
    ];
  }
  async detail() {
    const { ctx } = this;
    const detailInfo = await ctx.service.user.detail(ctx.query.id);
    console.log('detailInfo:', detailInfo);
    // 获取单条数据
    const res = await ctx.model.User.findByPk(ctx.query.id);
    // console.log('ctx.query:', ctx.query);
    // ctx.body = 'detail';
    // ctx.body = ctx.query.id;
    ctx.body = res;
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
    ctx.session.user2 = body;
    ctx.session.zh = '中文测试';
    ctx.session.test = 'test';

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
  // 编辑
  async edit() {
    const { ctx } = this;
    const user = await ctx.model.User.findByPk(ctx.request.body.id);
    if (!user) {
      ctx.body = {
        status: 404,
        errorMsg: 'id not exists',
      };
      return;
    }
    const res = await user.update(ctx.request.body);
    ctx.body = { data: res, status: 200 };
  }
  // 删除
  async remove() {
    const { ctx } = this;
    const user = await ctx.model.User.findByPk(ctx.request.body.id);
    if (!user) {
      ctx.body = {
        status: 404,
        errorMsg: 'id not exists',
      };
      return;
    }
    const res = await user.destroy(ctx.request.body.id);
    ctx.body = { data: res, status: 201 };
  }
  // 添加 add
  async add() {
    const { ctx } = this;
    // console.log('body:', ctx.request.body);
    // // 定义创建接口的请求参数规则
    // const rules = {
    //   name: 'string',
    //   age: 'number',
    // };
    // 校验 `ctx.request.body` 是否符合我们预期的格式
    // 如果参数校验未通过，将会抛出一个 status = 422 的异常
    // ctx.validate(rules, ctx.request.body);
    // model 添加数据
    const res = await ctx.model.User.create(ctx.request.body);
    ctx.body = {
      status: 200,
      data: res,
      // body: ctx.request.body,
      me: 'user add',
    };
  }
}

module.exports = UserController;
