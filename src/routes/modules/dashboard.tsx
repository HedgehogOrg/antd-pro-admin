import { lazy } from 'react';

const Dashboard = lazy(() => import('../../modules/dashboard/pages/Dashboard'));

const DashboardRoute = {
  path: 'dashboard',
  name: '概况',
  component: <Dashboard />
}

export default DashboardRoute
