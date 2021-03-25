// import env from './env';
import {
  getToken,
  setToken,
  initZzeToken,
  zzeTokenOvertimeError,
  initUrlToken,
  defaultTokenType,
  defaultHeaderKey,
  defaultAccessToken,
} from './token';

jest.mock('./env', () => {
  return {
    isInZhuzher: () => false,
  };
});

describe('测试获取和设置token', () => {
  it('根据类型 获取默认token, 默认是Bearer类型', () => {
    const token = getToken();
    expect(token.type).toBe(defaultTokenType);
    expect(token.accessToken).toBe(defaultAccessToken);
    expect(token.full).toBe(`${defaultTokenType} ${defaultAccessToken}`);
    expect(token.headerKey).toBe(defaultHeaderKey);
  });

  it('根据类型 获取默认token', () => {
    const token = getToken(defaultTokenType);
    expect(token.type).toBe(defaultTokenType);
    expect(token.accessToken).toBe(defaultAccessToken);
    expect(token.full).toBe(`${defaultTokenType} ${defaultAccessToken}`);
    expect(token.headerKey).toBe(defaultHeaderKey);
  });

  it('设置token 默认类型是Bearer', () => {
    setToken('simple token');

    let token = getToken();
    expect(token.type).toBe(defaultTokenType);
    expect(token.accessToken).toBe('simple token');

    setToken({
      accessToken: '321',
    });

    token = getToken(defaultTokenType);
    expect(token.type).toBe(defaultTokenType);
    expect(token.accessToken).toBe('321');

    setToken({
      type: 'sometype',
      accessToken: '321123',
      headerKey: 'X',
    });

    token = getToken('sometype');
    expect(token.type).toBe('sometype');
    expect(token.accessToken).toBe('321123');
    expect(token.headerKey).toBe('X');
  });

  it('初始化住这儿token, 非住这儿抛错', async () => {
    expect.assertions(1);
    initZzeToken();

    try {
      await initZzeToken.check(100);
    } catch (e) {
      expect(e).toEqual(zzeTokenOvertimeError);
    }
  });

  it('从url获取token并设置1', async () => {
    const t = '123';

    const search = `?a=1&accessToken=${t}`;
    initUrlToken(search);
    const { accessToken, type, headerKey } = getToken();

    expect(accessToken).toBe(t);
    expect(type).toBe(defaultTokenType);
    expect(headerKey).toBe(defaultHeaderKey);
  });

  it('从url获取token并设置2', async () => {
    const t = '123';
    const tt = 'BB';
    const search = `?a=1&accessToken=${t}&tokenType=${tt}`;
    initUrlToken(search);
    const { accessToken, type, headerKey } = getToken(tt);

    expect(accessToken).toBe(t);
    expect(type).toBe(tt);
    expect(headerKey).toBe(defaultHeaderKey);
  });

  it('从url获取token并设置3', async () => {
    const t = '123';
    const tt = 'BB';
    const hk = 'kk';
    const search = `?a=1&accessToken=${t}&tokenType=${tt}&tokenHeaderKey=${hk}`;
    initUrlToken(search);
    const { accessToken, type, headerKey } = getToken(tt);

    expect(accessToken).toBe(t);
    expect(type).toBe(tt);
    expect(headerKey).toBe(hk);
  });
});
