// @ts-nocheck
import { ApplyPluginsType } from 'D:/www/JavaScript/react/my-antd/umi-demo/node_modules/@umijs/runtime';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "component": require('@/layouts/index.tsx').default,
    "routes": [
      {
        "path": "/antd",
        "exact": true,
        "component": require('@/pages/antd/index.tsx').default
      },
      {
        "path": "/context",
        "exact": true,
        "component": require('@/pages/context/index.tsx').default
      },
      {
        "path": "/dva",
        "exact": true,
        "component": require('@/pages/dva/index.tsx').default
      },
      {
        "path": "/dva/lists",
        "exact": true,
        "component": require('@/pages/dva/lists.tsx').default
      },
      {
        "path": "/dva/search",
        "exact": true,
        "component": require('@/pages/dva/search.tsx').default
      },
      {
        "path": "/hoc",
        "exact": true,
        "component": require('@/pages/hoc/index.tsx').default
      },
      {
        "path": "/",
        "exact": true,
        "component": require('@/pages/index.tsx').default
      },
      {
        "path": "/lifecycle",
        "exact": true,
        "component": require('@/pages/lifecycle/index.tsx').default
      },
      {
        "path": "/lists",
        "exact": true,
        "component": require('@/pages/lists/index.tsx').default
      },
      {
        "path": "/lists/list-item",
        "exact": true,
        "component": require('@/pages/lists/list-item.tsx').default
      },
      {
        "path": "/reducer",
        "exact": true,
        "component": require('@/pages/reducer/index.tsx').default
      },
      {
        "path": "/redux",
        "exact": true,
        "component": require('@/pages/redux/index.tsx').default
      },
      {
        "path": "/useEffect",
        "exact": true,
        "component": require('@/pages/useEffect/index.tsx').default
      },
      {
        "path": "/useRef",
        "exact": true,
        "component": require('@/pages/useRef/index.tsx').default
      }
    ]
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
