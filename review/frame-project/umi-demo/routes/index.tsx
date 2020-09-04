export const routes = [
  {
    path: '/',
    component: '@/pages/index',
    wrappers: ['@/layouts/index']
  },
  {
    path: '/portals',
    component: '@/pages/portals/index',
    wrappers: ['@/layouts/index'],
  },
  {
    path: '/context',
    component: '@/pages/context',
    wrappers: ['@/layouts/index'],
  },
  {
    path: '/lazy',
    component: '@/pages/lazy',
    wrappers: ['@/layouts/index'],
  },
  {
    path: '/optimizing',
    component: '@/pages/optimize',
    wrappers: ['@/layouts/index'],
  },
  {
    path: '/scu',
    component: '@/pages/scu',
    wrappers: ['@/layouts/index'],
  },
  {
    path: '/hoc',
    component: '@/pages/hoc',
    wrappers: ['@/layouts/index'],
  },
]



