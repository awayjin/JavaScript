'use strict';

const { Subscription } = require('egg');

class getInfo extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      // interval: 5000,
      // 每三小时准点执行一次
      // cron: '0 0 */3 * * *',
      cron: '*/3 * * * * *',
      // 'all', 指定所有的 worker 都需要执行
      // worker 类型：每台机器上只有一个 worker 会执行这个定时任务，每次执行定时任务的 worker 的选择是随机的。
      // all 类型：每台机器上的每个 worker 都会执行这个定时任务。
      type: 'worker',
    };
  }
  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    const info = this.ctx.info;
    console.log('--> Subscription::', new Date(), info);
  }
}

module.exports = getInfo;

