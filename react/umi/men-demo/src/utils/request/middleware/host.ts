import { OnionMiddleware } from 'umi-request';
import env, { isLocal } from '@/utils/env';
import { IExtraRequestOptions } from '@/services/interface';
/**
 * 中间件 切换mock 测试 生产的域名
 * mock 就请求本地的mock
 */
const addHost: OnionMiddleware = async (ctx, next) => {
  const mock = env.USE_MOCK;
  const REG_URL = /^http/i;
  const isHttpUrl = REG_URL.test(ctx.req.url);

  const extra: IExtraRequestOptions =
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    ctx.req.options.extraRequestOptions || {};

  // 完整的http url不做处理
  console.log(isHttpUrl, 'isHttpUrl');
  if (!isHttpUrl) {
    // 本地开启了代理就使用代理
    const proxyHost = extra.proxy;
    if (proxyHost) {
      if (isLocal) {
        ctx.req.url = `${proxyHost}${ctx.req.url}`;
      }
    } else if (mock) {
      // mock 不做处理, 由umi转发
    } else {
      // 拼接真实域名
      const host = extra.host || env.FD_API_HOST;
      ctx.req.url = `${host}${ctx.req.url}`;
    }
  }

  await next();
};
export default addHost;
