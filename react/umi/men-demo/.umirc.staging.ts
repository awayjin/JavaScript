import { defineConfig } from 'umi';
// 全局变量
const define = {
  ENV: 'staging',
  APP_ENV: process.env.APP_ENV,
  APP_VERSION: process.env.APP_VERSION,
  APP_VERSION_TIME: process.env.APP_VERSION_TIME,
  USE_MOCK: false,
  QINIU_ACCESS_KEY: 'ftGy8pZUrRC6I9CGxNvcCWRm3_9oQ3TaVgElooTW',
  QINIU_SECRET_KEY: 'BswRsqbyqGEBjaPFYFGvu8gQhajY_nuhLEzXMuVt',
  QINIU_BUCKET: 'fg-test',
  FD_API_HOST: 'https://fd-test.4009515151.com',
  QINIU_DOMAIN: 'https://fgtest.4009515151.com',
  QINIU_UPLOAD_DOMAIN: 'https://up.qiniup.com',
  MARKET_API_HOST: 'https://sino.bu6.io',
  QUICK_PAY_HOST: 'https://paytest.4009515151.com',
  TASK_API_HOST: 'https://fd-test.4009515151.com/mars',
  VENUS_API_HOST: 'https://fd-test.4009515151.com/mars',
  GATE_API_HOST: 'https://gatewaytest.4009515151.com',
  BLACKPEARL_HOST: 'https://blackpearltest.4009515151.com',
  FG_HOST: 'https://fgtest.bu6.io',
};

export default defineConfig({
  define,
  // cdn 地址
  // publicPath: `${define.QINIU_DOMAIN}/mekansm/`,
  devtool: 'source-map',
});
