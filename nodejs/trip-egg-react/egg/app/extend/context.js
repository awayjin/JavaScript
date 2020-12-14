'use strict';
// const os = require('os');

// module.exports = {
//   get info() {
//     const data = {
//       memory: os.totalmem() / 1024 / 1024 / 1024 + 'G',
//       platform: os.platform(),
//       cpus: os.cpus().length,
//       url: this.request.url,
//     };
//     return data;
//   },
// };

module.exports = {
  params(key) {
    const method = this.request.method;
    if (method === 'GET') {
      return key ? this.query[key] : this.query;
    } else if (method === 'POST') {
      return key ? this.request.body[key] : this.request.body;
    }
  },
};
