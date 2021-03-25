/**
 * 住这儿token
 * 助英台token
 * 从url获取token
 * 允许拓展token
 */
import { getUserBasic } from './jsBridge';
import { isInZhuzher } from './env';
import { tokenOfUrl } from './url';

type ITokenType = 'Bearer' | string;

type IToken = {
  type: ITokenType;
  accessToken: string;
  full: string;
  headerKey: 'Authorization' | string;
};

type ITokens = {
  [p in ITokenType]: IToken;
};

export const defaultTokenType: ITokenType = 'Bearer';
export const defaultAccessToken = 'test';
export const defaultHeaderKey = 'Authorization';

const tokens: ITokens = {
  Bearer: {
    type: defaultTokenType,
    accessToken: defaultAccessToken,
    full: `${defaultTokenType} ${defaultAccessToken}`,
    headerKey: defaultHeaderKey,
  },
};

/**
 * 根据 type 在tokens创建一个新的token对象
 * @param type
 */
const makeToken = (
  type: ITokenType,
  accessToken: string,
  headerKey: string,
) => {
  tokens[type] = {
    type,
    accessToken,
    full: `${type} ${accessToken}`,
    headerKey,
  };
};

/**
 * 返回token
 * @param type
 */
export const getToken = (type?: ITokenType) => {
  if (type === undefined) {
    type = defaultTokenType;
  }
  if (!(type in tokens)) {
    console.error('token type no exits');
    type = defaultTokenType;
  }
  return tokens[type];
};

type ISetTokenOption =
  | {
      accessToken: string;
      type?: ITokenType;
      headerKey?: string;
    }
  | string;
/**
 * 使用方法请看 src/utils/token.test.ts
 * @param opt
 */
export const setToken = (opt: ISetTokenOption) => {
  if (typeof opt === 'string') {
    makeToken(defaultTokenType, opt, defaultHeaderKey);
  } else {
    const {
      type = defaultTokenType,
      accessToken,
      headerKey = defaultHeaderKey,
    } = opt;
    makeToken(type, accessToken, headerKey);
  }
};

/**
 * 初始化住这儿token
 */

interface IInitZzeToken {
  (): void;
  finished?: boolean; // token是否初始化完成
  check: (timeout?: number) => Promise<boolean>; // 检查token是否初始化完成
}

export const zzeTokenError = new Error('住这儿jsbridge 获取token失败');
export const zzeTokenOvertimeError = new Error('初始化住这儿 token超时');

export const initZzeToken: IInitZzeToken = () => {
  if (isInZhuzher) {
    getUserBasic(res => {
      initZzeToken.finished = true;
      const { token } = res;
      if (token) {
        setToken(token);
      } else {
        throw zzeTokenError;
      }
    });
  }
};

initZzeToken.finished = false;

initZzeToken.check = (maxTimeout = 50000) => {
  const ms = 100;
  let timeout = 0;
  return new Promise((resolve, reject) => {
    const timer = setInterval(() => {
      timeout += ms;
      if (initZzeToken.finished) {
        resolve(true);
        clearInterval(timer);
      }
      if (timeout >= maxTimeout) {
        reject(zzeTokenOvertimeError);
        clearInterval(timer);
      }
    }, ms);

    if (initZzeToken.finished) {
      resolve(true);
      clearInterval(timer);
    }
  });
};

/**
 * 从url的search获取token
 * @param search
 * @returns boolean isInit 是否初始化了url token
 */
export const initUrlToken = (search: Location['search']) => {
  const { accessToken, tokenType, tokenHeaderKey } = tokenOfUrl(search);
  if (accessToken) {
    setToken({
      accessToken: accessToken as string,
      type: tokenType as string,
      headerKey: tokenHeaderKey as string,
    });
    return true;
  }
  return false;
};

/**
 * 优先级 url => 住这儿
 */
export const initToken = () => {
  // eslint-disable-next-line no-restricted-globals
  const initUrlTokened = initUrlToken(location.search);
  if (!initUrlTokened) {
    initZzeToken();
  }
};
