/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path');
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1604804121998_9024';

  // add your middleware config here
  // config.middleware = [ 'm1', 'm2' ];
  config.middleware = [ 'httpLog' ];

  // csrf
  config.security = {
    csrf: {
      enable: false,
    },
  };

  // ejs
  config.view = {
    mapping: {
      // '.ejs': 'ejs',
      '.html': 'ejs',
    },
  };
  config.ejs = {};

  // session
  config.session = {
    key: 'JIMU_SESSION',
    // 是否能通过js获取, document.cookie
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
    // 发现当用户 Session 的有效期仅剩下最大有效期一半的时候，重置 Session 的有效期
    renew: true,
  };

  // static
  config.static = {
    prefix: '/public/',
    dir: path.join(appInfo.baseDir, 'app/public'),
  };
  // egg-auth 自定义
  config.auth = {
    exclude: [
      '/home', '/user/', '/user', '/login', '/logout',
      '/user/add',
      '/user/edit',
      '/user/remove',
    ],
  };

  // mysql
  config.mysql = {
    app: true,
    client: {
      host: '127.0.0.1',
      port: '3306',
      user: 'root',
      password: '123456',
      database: 'egg_trip',
    },
  };

  // sequelize
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'egg_trip',
    define: {
      timestamps: false, // 不需要添加时间
      freezeTableName: true, // 不需要自动处理表名
    },
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
