// @ts-nocheck
/* eslint-disable no-undef */
import platform from './platform';

export type IENV = 'local' | 'staging' | 'prod';

/**
 * 在.umirc.ts 用define定义的全局变量，会在webpack编译时替换
 */
const env = {
  ENV: ENV as IENV,
  APP_ENV: APP_ENV as string,
  APP_VERSION: APP_VERSION as string,
  APP_VERSION_TIME: APP_VERSION_TIME as string,
  USE_MOCK: USE_MOCK as boolean,
  QINIU_ACCESS_KEY: QINIU_ACCESS_KEY as string,
  QINIU_SECRET_KEY: QINIU_SECRET_KEY as string,
  QINIU_BUCKET: QINIU_BUCKET as string,
  FD_API_HOST: FD_API_HOST as string,
  QINIU_DOMAIN: QINIU_DOMAIN as string,
  QINIU_UPLOAD_DOMAIN: QINIU_UPLOAD_DOMAIN as string,
  MARKET_API_HOST: MARKET_API_HOST as string,
  QUICK_PAY_HOST: QUICK_PAY_HOST as string,
  TASK_API_HOST: TASK_API_HOST as string,
  VENUS_API_HOST: VENUS_API_HOST as string,
  GATE_API_HOST: GATE_API_HOST as string,
  BLACKPEARL_HOST: BLACKPEARL_HOST as string,
  FG_HOST: FG_HOST as string,
};

export default env;

export const isProduction = env.ENV === 'prod';
export const isLocal = env.ENV === 'local';
export const isStaging = env.ENV === 'staging';

export const { isInZhuzher } = platform;
export const { isInZhuYingTai } = platform;
export const { isInWechat } = platform;
export const isiPhoneX = platform.isIPhoneX;
export const { isAndroid } = platform;
export const { isIos } = platform;
