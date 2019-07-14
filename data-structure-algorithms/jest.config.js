// https://www.jianshu.com/p/ce4f46cd9372

module.exports = {
  // preset: "ts-jest",
  // "presets": [["env", {"modules": false}]],
  // testMatch: ["<rootDir>/tests/**/*.(spec|test).ts?(x)"],
  transform: {
    // 将.js后缀的文件使用babel-jest处理
    "^.+\\.js$": "babel-jest",
    // "^.+\\.(ts|tsx)$": "ts-jest"
  },
  testMatch: ["**/*.(spec|test).(js|jsx|ts|tsx)"],
  transformIgnorePatterns: [
    '/node_modules/'
  ],
  // 不忽略 lodash-es, other-es-lib 这些es库, 从而使babel-jest去处理它们
  // transformIgnorePatterns: ["<rootDir>/node_modules/(?!(lodash-es|other-es-lib))"]
};