'use strict';

module.exports = options => {
  return async (ctx, next) => {
    console.log('---> options', options);
    console.log('m1 start');
    await next();
    console.log('m1 end');
  };
};
