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
  config.middleware = [];

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
    maxAge: 1000 * 3,
    // 发现当用户 Session 的有效期仅剩下最大有效期一半的时候，重置 Session 的有效期
    renew: true,
  };

  // static
  config.static = {
    prefix: '/public/',
    dir: path.join(appInfo.baseDir, 'app/public'),
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
