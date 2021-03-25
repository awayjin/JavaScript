/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * global.ts 会在app.ts之前运行
 */
import { initToken } from '@/utils/token';
import * as Sentry from '@sentry/browser';
import env, {
  isLocal,
  isInZhuYingTai,
  isInWechat,
  isInZhuzher,
} from '@/utils/env';
import '@/styles/classes/_base.less';
import '@/styles/classes/_loop.less';
// 初始化Token
initToken();

// 初始化调试工具，生产会关闭
// 这里会经过webpack编译忽略, 所以需要使用CMD的写法
if (
  (process.env.NODE_ENV === 'production' &&
    process.env.UMI_ENV === 'staging') ||
  process.env.NODE_ENV !== 'production'
) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  // eslint-disable-next-line global-require
  const VConsole = require('vconsole');
  if (isInZhuzher || isInWechat || isInZhuYingTai) {
    // eslint-disable-next-line no-new
    new VConsole();
  }
}
// 非本地发送异常到sentry
if (!isLocal) {
  const dsn = ''; // 这里需要sentry dsn ，需要自行申请
  if (dsn) {
    Sentry.init({
      dsn,
      release: `${env.APP_ENV}-${env.APP_VERSION_TIME}-${env.APP_VERSION}`,
    });
  }
}
