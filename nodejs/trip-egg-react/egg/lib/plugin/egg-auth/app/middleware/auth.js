'use strict';

// 自定义插件
module.exports = options => {
  return async (ctx, next) => {
    const url = ctx.request.url;
    console.log('--> url', url);
    console.log('--> options', options);
    const user = ctx.session.user;
    const urlFirst = options.exclude.includes(ctx.request.url.split('?')[0]);
    console.log('urlFirst:', urlFirst);
    if (!user && !urlFirst) {
      ctx.body = {
        status: '1001',
        errorMsg: '用户未登录',
      };
    } else {
      await next();
    }
  };
};