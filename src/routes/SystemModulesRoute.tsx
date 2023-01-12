import { lazy } from 'react';

const Modules = lazy(() => import('@/modules/system/module'));

const SystemModulesRoute = {
  path: 'system-modules',
  name: 'SYSTEM_MODULES',
  permission: 'SYSTEM_MODULES',
  component: <Modules />,
};

export default SystemModulesRoute;
