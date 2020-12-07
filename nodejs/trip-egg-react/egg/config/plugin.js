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
