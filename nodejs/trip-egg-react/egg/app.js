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
  }
  async didLoad() {
    const store = {};
    const app = this.app;
    console.log('---> app:', app);
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
  }
}
module.exports = AppBootHook;
