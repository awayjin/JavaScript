import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // layout: {},
  routes: [
    // { path: '/', component: '@/pages/index' },
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        { path: '/', component: '@/pages/home', title: '首页' },
        { path: '/order', component: '@/pages/order', title: '订单' },
        { path: '/user', component: '@/pages/user', title: '我的' },
      ]
    }
  ],
});
