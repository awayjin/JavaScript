'use strict';

// 自定义插件
module.exports = options => {
  return async (ctx, next) => {
    const url = ctx.request.url;
    // console.log('--> options', options);
    const user = ctx.session.user;
    const urlFirst = options.exclude.includes(ctx.request.url.split('?')[0]);
    console.log('-----> 1. url', url);
    // console.log('ctx.session:', ctx.session);
    console.log('user:', user);
    console.log('urlFirst:', urlFirst);
    // 获取session
    // const zhSession = ctx.session.zh;
    if (!user && !urlFirst) {
      ctx.body = {
        status: '1001',
        errorMsg: '用户未登录',
      };
    } else {
      await next();
    }
    // const url = ctx.request.url;
    // console.log('--- url', url);
    // const user = ctx.session.user;
    // const urlFirst = options.exclude.includes(ctx.request.url.split('?')[0]);
    // const urlInclude = options.exclude.includes(ctx.request.url.split('?')[0]);
    // console.log('fir:', urlFirst);
    // console.log('urlInclude:', urlInclude);
    // if (!user && !urlInclude) {
    //   ctx.body = {
    //     status: 1001,
    //     errMsg: '用户未登录',
    //   };
    // } else {
    //   await next();
    // }
  };
};