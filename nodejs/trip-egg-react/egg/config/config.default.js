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
