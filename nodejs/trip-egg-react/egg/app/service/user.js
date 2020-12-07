'use strict';

const { Service } = require('egg');

class UserService extends Service {
  async detail(id) {
    return {
      id,
      name: 'lily',
      age: 16,
    };
  }
}

module.exports = UserService;
