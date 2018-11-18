import React from 'react';

import LcmHelpers from '../core/helpers/LcmHelpers';
import { appsConfigs } from '../modules/apps/appsConfigs';

const routeConfigs = [
  ...appsConfigs,
];

export const routes = [
  ...LcmHelpers.generateRoutesFromConfigs(routeConfigs),
  {
    path: '/',
    exact: true,
    // component: () => <Redirect to="/pages/pricing/style-2"/>
    component: () => <div>루트</div>
  }
];
