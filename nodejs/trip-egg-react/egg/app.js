'use strict';

// 函数启动 已经废弃
// module.exports = app => {
//   const store = {};
//   console.log('---> app 2:', app);
//   // 把 session 存储到内存中
//   app.sessionStore = {
//     async get(key) {
//       console.log('--store 2---:', store);
//       return store[key];
//     },
//     async set(key, value) {
//       store[key] = value;
//     },
//     async destroy(key) {
//       store[key] = null;
//     },
//   };
// };

class AppBootHook {
  constructor(app) {
    this.app = app;
    const store = {};
    // const app = this.app;
    // console.log('--->app.js app:', app);
    // 把 session 存储到内存中
    app.sessionStore = {
      async get(key) {
        console.log('--store---:', store);
        return store[key];
      },
      async set(key, value) {
        store[key] = value;
      },
      async destroy(key) {
        store[key] = null;
      },
    };
    // 自定义插件的中间件
    app.config.coreMiddleware.push('auth');
  }
  async didLoad() {
  }
}
module.exports = AppBootHook;
