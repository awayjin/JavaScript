// todo url redicturl
import queryString from 'query-string';
import { isString } from './index';

interface IQueryOfURL {
  (search?: Location['search'], useDecode?: boolean): {
    [p: string]: string | undefined;
  };
}
/**
 * 解析url里面的key
 */
export const queryOfURL: IQueryOfURL = (
  search = location.search,
  useDecode = true,
) => {
  // eslint-disable-next-line no-restricted-globals
  const params = queryString.parse(search);
  // eslint-disable-next-line no-shadow
  const decodeParams = (params: { [p: string]: any }) => {
    // decodeURIComponent
    const p: { [p: string]: any } = {};
    Object.keys(params).forEach(k => {
      const v = params[k];
      if (isString(v)) {
        if (useDecode) {
          p[k] = decodeURIComponent(v);
        } else {
          p[k] = v;
        }
      }
    });
    return p;
  };

  const p = decodeParams(params);

  return p;
};

type ITokenKey = 'accessToken' | 'tokenType' | 'tokenHeaderKey' | 'backUrl';

interface ITokenOfURL {
  (search: Location['search']): {
    [p in ITokenKey]: string | undefined;
  };
}
/**
 * 返回token使用的固定的url key
 * @param search
 */
export const tokenOfUrl: ITokenOfURL = (search: Location['search']) => {
  const p = queryOfURL(search);

  const res = {
    accessToken: p.accessToken,
    tokenType: p.tokenType,
    tokenHeaderKey: p.tokenHeaderKey,
    backUrl: p.backUrl,
  };

  return res;
};
