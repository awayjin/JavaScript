import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // layout: {},
  routes: [
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        { path: '/', component: '@/pages/home', title: '首页' },
        { path: '/orders', component: '@/pages/order', title: '订单' },
        { path: '/users', component: '@/pages/user', title: '我的' },
      ]
    }
  ],
});
