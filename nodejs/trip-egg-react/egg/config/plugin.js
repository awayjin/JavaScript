'use strict';

/** @type Egg.EggPlugin */
// module.exports = {
//   // had enabled by egg
//   // static: {
//   //   enable: true,
//   // }
// };

const path = require('path');

exports.info = {
  enable: true,
  path: path.join(__dirname, '../lib/plugin/egg-info'),
};

// egg-validate
exports.validate = {
  enable: true,
  package: 'egg-validate',
};

// ejs
exports.ejs = {
  enable: true,
  package: 'egg-view-ejs',
};

// egg-auth 插件的中间件，还要做额外的配置
exports.auth = {
  enable: true,
  // package: 'egg-auth', // package 表示安装了某些依赖包
  path: path.join(__dirname, '../lib/plugin/egg-auth'),
};

// mysql
exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};

