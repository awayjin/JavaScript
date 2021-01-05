import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
<<<<<<< HEAD
  layout: {},
=======
  // layout: {},
>>>>>>> de3b7cd7ba23e9a1bb6e648d66b731da7167405d
  routes: [
    // { path: '/', component: '@/pages/index' },
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
