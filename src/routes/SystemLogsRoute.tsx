import { lazy } from 'react';

const SystemLogs = lazy(() => import('@/modules/system-logs/pages/SystemLogs'));

const SystemLogsRoute = {
  path: 'system-logs',
  name: 'SYSTEM_LOGS',
  permission: 'SYSTEM_LOGS',
  component: <SystemLogs />,
};

export default SystemLogsRoute;
