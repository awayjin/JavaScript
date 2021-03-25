import { defineConfig } from 'umi';
import theme from './src/styles/less-variable';
import routes from './routes/routes';
import { proxyEnum } from './src/utils/proxyEnum';
// 全局变量'
const define = {
  ENV: 'local',
  APP_ENV: process.env.APP_ENV,
  APP_VERSION: process.env.APP_VERSION,
  APP_VERSION_TIME: process.env.APP_VERSION_TIME,
  USE_MOCK: true,
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
  FG_HOST: 'https://fgtest.bu6.io', // fg 服务的域名，目前需要用来换取上传图片的token
};

export default defineConfig({
  define,
  routes,
  favicon: 'https://img.4009515151.com/app_icon.png',
  base: '/men-demo/',
  publicPath: '/men-demo/',
  outputPath: 'dist/men-demo/',
  request: {
    dataField: 'result', // 统一用result作为key，需要定制的可以在useRequest 配置formatResult
  },
  dva: false,
  hash: true, // 生成的文件包含 hash 后缀
  ignoreMomentLocale: true, // 忽略 moment 的 locale 文件，用于减少尺寸。
  dynamicImport: { loading: '@/Loading' }, // 按需加载 按路由切割页面js
  theme,
  proxy: {
    [proxyEnum.fd]: {
      target: define.FD_API_HOST,
      changeOrigin: true,
      pathRewrite: { [`^${proxyEnum.fd}`]: '' },
    },
  },
});
