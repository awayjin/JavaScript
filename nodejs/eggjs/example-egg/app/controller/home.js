// app/controller/home.js
// const Controller = require('egg').Controller;
const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'Hello world';
  }
}

module.exports = HomeController;