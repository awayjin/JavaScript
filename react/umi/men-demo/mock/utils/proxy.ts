import request, { RequestOptionsInit } from 'umi-request';

/**
 * 转发请求
 * @param url
 */
export function proxy(url: string, options?: RequestOptionsInit) {
  return async (req, res) => {
    const response = await request(url, options);
    res.send(response);
  };
}
