import { defineConfig } from 'umi';
import { routes } from './routes/index'

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes,
});
