'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/newApp', controller.home.newApp); // app 方法的扩展
  router.get('/newCtx', controller.home.newCtx); // ctx
  router.post('/newCtx2', controller.home.newCtx); // ctx
  router.get('/newRequest', controller.home.newRequest); // request
  router.get('/newResponse', controller.home.newResponse); // response
  router.get('/demo', controller.home.demo);

  router.get('/user', controller.user.index);
  router.post('/user/edit', controller.user.edit);
  router.post('/user/remove', controller.user.remove);
  router.get('/user/lists', controller.user.lists);
  // post
  router.post('/user/add', controller.user.add);

  router.get('/user/detail', controller.user.detail);
  router.get('/user/detail2/:id', controller.user.detail2);
  router.get('/user/detail3', controller.user.detail3);
  // login
  router.post('/login', controller.user.login);
  router.post('/logout', controller.user.logout);

  // curl
  router.get('/curl/get', controller.curl.curlGet);
  router.post('/curl/post', controller.curl.curlPost);
};
