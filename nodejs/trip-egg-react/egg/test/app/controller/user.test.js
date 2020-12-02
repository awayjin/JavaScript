'use strict';

// eslint-disable-next-line no-unused-vars
const { app, mock, assert } = require('egg-mock/bootstrap');

describe('user text', () => {
  it('user index', () => {
    return app.httpRequest()
      .get('/user')
      .expect(200)
      .expect('user index 1');
  });
  // 异步测试
  it('user lists', async () => {
    await app.httpRequest()
      .get('/user/lists')
      .expect(200)
      .expect('[{"text":"user demo"}]');
  });
});

