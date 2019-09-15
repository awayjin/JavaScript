// https://www.jianshu.com/p/ce4f46cd9372
// 配置文档: https://jestjs.io/docs/zh-Hans/configuration

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
  // moduleNameMapper: {
  //   '^@/(.*)$': '<rootDir>/code-three/$1'
  // },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/',
    // '<rootDir>/resource-code-three/**/*.js',
    // '<rootDir>/resource-code-two/**/*.js'
  ],
  // verbose: true,
  // collectCoverageFrom: [
  //   "resource-code-three/**/*.{js,ts}",
  //   "!**/node_modules/**"
  // ],
  // collectCoverage: true,
  // collectCoverageFrom: [
  //   "**/*.js",
  //   "!**/resource-code-three/**",
  //   "!**/node_modules/**",
  //   "!**/vendor/**"
  // ],
  // "collectCoverageFrom": [
  //   "code-three/**/*.{js}",
  //   "!**/node_modules/**",
  //   "!**/vendor/**"
  // ]
  // 不忽略 lodash-es, other-es-lib 这些es库, 从而使babel-jest去处理它们
  // transformIgnorePatterns: ["<rootDir>/node_modules/(?!(lodash-es|other-es-lib))"]
};