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
        { path: '/search', component: '@/pages/search', title: '搜索' },
        { path: '/demo', component: '@/pages/demo', title: 'demo-til' },
        { path: '/observer', component: '@/pages/observer', title: 'observer' },
      ]
    }
  ],
  proxy: {
    '/backend': {
      target: 'http://localhost:3003/',
      changeOrigin: true,
      pathRewrite: { '^/backend': '/backend'}
    },
    // '/api': {
    //   'target': 'http://jsonplaceholder.typicode.com/',
    //   'changeOrigin': true,
    //   'pathRewrite': { '^/api' : '/api' },
    // }
  }
});
