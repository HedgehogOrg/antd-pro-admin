import { lazy } from 'react';

const Dashboard = lazy(() => import('../../modules/dashboard/pages/Dashboard'));

const DashboardRoute = {
  path: '/',
  name: '概况',
  component: <Dashboard />,
  routes: [{
    path: 'dashboard',
    component: <Dashboard />,
  }]
}

export default DashboardRoute
