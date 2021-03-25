import { tokenOfUrl, queryOfURL } from './url';

describe('url 工具', () => {
  it('解析url的query accessToken', () => {
    const t = '123';
    const search = `?accessToken=${t}`;

    const params = tokenOfUrl(search);
    const { accessToken } = params;

    expect(accessToken).toBe(t);
  });
  it('解析url的query tokenType', () => {
    const t = '123';
    const search = `?tokenType=${t}`;

    const params = tokenOfUrl(search);
    const { tokenType } = params;

    expect(tokenType).toBe(t);
  });

  it('解析url的query tokenHeaderKey', () => {
    const t = '123';
    const search = `?tokenHeaderKey=${t}`;

    const params = tokenOfUrl(search);
    const { tokenHeaderKey } = params;

    expect(tokenHeaderKey).toBe(t);
  });

  it('解析url的query backUrl', () => {
    const t = '123';
    const search = `?backUrl=${t}`;

    const params = tokenOfUrl(search);
    const { backUrl } = params;

    expect(backUrl).toBe(t);
  });

  it('解析url的query 其他query', () => {
    const t = '123';
    const search = `?someQuery=${t}`;

    const params = queryOfURL(search);
    const { someQuery } = params;

    expect(someQuery).toBe(t);
  });
});
