import React from 'react';
import Loadable from 'react-loadable';

const Loading = () => {
  return (
    <div>... 로딩 ...</div>
  );
};

const LoadableComponent = (options) => {
  return Loadable(Object.assign({
    loading: Loading,
    delay: 300,
    timeout: 10000
  }, options));
};

export const DashboardAppConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: true,
          isPageLayout: false
        },
        toolbar: {
          display: true,
          isPageLayout: false
        }
      }
    }
  },
  routes  : [
    {
      path: '/dashboards',
      component: LoadableComponent({
        loader: () => import('./DashboardApp')
      })
    }
  ]
};
