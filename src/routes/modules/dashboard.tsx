import { lazy } from 'react';

const Dashboard = lazy(() => import('../../modules/dashboard/pages/Dashboard'));

const DashboardRoute = {
  path: 'dashboard',
  permission: 'dashboard',
  name: 'menu.DASHBOARD',
  component: <Dashboard />
}

export default DashboardRoute
