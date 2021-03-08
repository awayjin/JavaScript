import { defineConfig } from 'umi';
import demoRouter from './src/router/demo-router'

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // routes: [
  //   ...demoRouter,
  // ],
});
