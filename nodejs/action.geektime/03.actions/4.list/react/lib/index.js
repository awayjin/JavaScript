"use strict";

var _demo = _interopRequireDefault(require("./json/demo.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

console.log('demoJson:', _demo["default"]);
var a = 444;
console.log('const webpack-dev-server:', a);

var arrow = function arrow() {
  return 'arrow function';
};

console.log('arrow:', arrow);