import { proxy } from './utils/proxy';
export default {
  /**
   * todo 失败的请求，返回错误信息, 用来测试请求错误处理
   */
  'GET /api/fail/post/400/0/error': (req, res) => {
    let data = {
      code: 0,
      result: {},
      message: '出错啦 错误码0',
    };
    let resData = JSON.stringify(data);
    res.status(400).end(resData);
  },

  'GET /api/fail/post/400/200/error': (req, res) => {
    let data = {
      code: 200,
      result: {},
      message: '出错啦错误码200',
    };
    let resData = JSON.stringify(data);
    res.status(400).end(resData);
  },

  'GET /api/fail/post/400/400/error': (req, res) => {
    let data = {
      code: 400,
      result: {},
      message: '出错啦错误码400',
    };
    let resData = JSON.stringify(data);
    res.status(400).end(resData);
  },

  'GET /api/fail/post/200/400/error': (req, res) => {
    let data = {
      code: 400,
      result: {},
      message: '出错啦错误码400',
    };
    let resData = JSON.stringify(data);
    res.status(200).end(resData);
  },

  'GET /api/fail/post/200/0/error': (req, res) => {
    let data = {
      code: 0,
      result: {},
      message: '出错啦错误码400',
    };
    let resData = JSON.stringify(data);
    res.status(200).end(resData);
  },

  'GET /api/fail/post/200/200/error': (req, res) => {
    let data = {
      code: 200,
      result: {},
      message: '出错啦错误码400',
    };
    let resData = JSON.stringify(data);
    res.status(200).end(resData);
  },
};
