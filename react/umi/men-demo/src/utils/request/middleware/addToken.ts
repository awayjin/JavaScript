import { OnionMiddleware } from 'umi-request';
import { isInZhuzher } from '@/utils/env';
import { getToken, initZzeToken, defaultTokenType } from '@/utils/token';
import { IExtraRequestOptions } from '@/services/interface';
/**
 * 添加请求token
 * @param ctx
 * @param next
 */
const addToken: OnionMiddleware = async (ctx, next) => {
  // 如果在住这儿，需要等待jsbridge返回token
  if (isInZhuzher) {
    await initZzeToken.check();
  }
  let tokenType = defaultTokenType;
  const extra: IExtraRequestOptions =
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    ctx.req.options.extraRequestOptions || {};

  if (extra.tokenType) {
    tokenType = extra.tokenType;
  }

  const { headerKey, full } = getToken(tokenType);
  ctx.req.options.headers = {
    ...ctx.req.options.headers,
    [headerKey]: full,
  };
  await next();
};

export default addToken;
