import { RequestConfig } from 'umi';

// import addHost from './middleware/host';
// import addToken from './middleware/addToken';
// import { errorConfig } from './errorHandle';

/**
 * 文档 https://umijs.org/zh-CN/plugins/plugin-request
 *
 */
export const request: RequestConfig = {
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 30000,
  // errorConfig,
  // middlewares: [addHost, addToken],
};
