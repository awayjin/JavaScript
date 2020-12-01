'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/demo', controller.home.demo);

  router.get('/user', controller.user.index)
  router.get('/user/demo', controller.user.demo)
};
