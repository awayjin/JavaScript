'use strict';
const path = require('path');
// const fs = require('fs');

module.exports = {
  // 扩展方法
  foo(param) {
    const value = param ? param : 'default value';
    // console.log('application.js params', param);
    return value;
  },
  // 属性扩展
  get bar() {
    return this.foo('extent get bar');
  },
  // package
  package(key) {
    const pack = getBack();
    return key ? pack[key] : pack;
  },
};

function getBack() {
  const filePath = path.join(process.cwd(), 'package.json');
  // const filePath = process.cwd() + '/package.json';
  // const pack = fs.readFileSync(filePath, 'utf8');
  const pack = require(filePath);
  return pack;
}
