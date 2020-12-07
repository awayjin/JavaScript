'use strict';

const { assert, app } = require('egg-mock/bootstrap');

describe('service user test', () => {
  // it('test detail', async () => {
  it.only('test detail', async () => {
    const ctx = app.mockContext();
    const user = await ctx.service.user.detail(342);
    console.log('user:', user);
    assert(user); // 断言
    assert(user.id === 342);
  });
});

