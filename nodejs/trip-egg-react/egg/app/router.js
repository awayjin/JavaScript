'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/demo', controller.home.demo);

  router.get('/user', controller.user.index);
  router.get('/user/lists', controller.user.lists);

  router.get('/user/detail', controller.user.detail);
  router.get('/user/detail2/:id', controller.user.detail2);
  router.get('/user/detail3', controller.user.detail3);
  // login
  router.post('/login', controller.user.login);
  router.post('/logout', controller.user.logout);

  // post
  router.post('/user/add', controller.user.add);
};
