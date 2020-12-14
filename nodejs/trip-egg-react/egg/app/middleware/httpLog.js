'use strict';
const dayjs = require('dayjs');
const fs = require('fs');

module.exports = () => {
  return async (ctx, next) => {
    const sTime = Date.now();
    const startTime = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    await next();
    const req = ctx.request;
    const log = {
      method: req.method,
      url: req.url,
      body: req.body,
      startTime,
      endTime: dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
      timeLength: `执行 ${Date.now() - sTime} 毫秒`,
    };
    // ctx.body = ;
    // console.log('log:', log);
    // console.log('httpLog.js ctx:', ctx);
    const data = `${dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss')} [httpLog] ${JSON.stringify(log)} \r\n\n`;
    const file = `${ctx.app.baseDir}/httpLog.log`;
    fs.appendFileSync(file, data);
  };
};