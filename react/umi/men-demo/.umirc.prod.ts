import { defineConfig } from 'umi';

const define = {
  ENV: 'prod',
  APP_ENV: process.env.APP_ENV,
  APP_VERSION: process.env.APP_VERSION,
  APP_VERSION_TIME: process.env.APP_VERSION_TIME,
  USE_MOCK: false,
  QINIU_ACCESS_KEY: 'ftGy8pZUrRC6I9CGxNvcCWRm3_9oQ3TaVgElooTW',
  QINIU_SECRET_KEY: 'BswRsqbyqGEBjaPFYFGvu8gQhajY_nuhLEzXMuVt',
  QINIU_BUCKET: 'vanke-app',
  FD_API_HOST: 'https://flyingdutchman.4009515151.com',
  QINIU_DOMAIN: 'https://img.4009515151.com',
  QINIU_UPLOAD_DOMAIN: 'https://upload.qbox.me',
  MARKET_API_HOST: 'https://sino.4009515151.com',
  QUICK_PAY_HOST: 'https://pay.4009515151.com',
  TASK_API_HOST: 'https://mars.4009515151.com',
  VENUS_API_HOST: 'https://flyingdutchman.4009515151.com',
  GATE_API_HOST: 'https://gateway.4009515151.com',
  BLACKPEARL_HOST: 'https://blackpearl.4009515151.com',
  FG_HOST: 'https://uiis.4009515151.com',
};
export default defineConfig({
  define,
  // cdn 地址
  // publicPath: `${define.QINIU_DOMAIN}/mekansm/`,
  devtool: 'source-map',
});
