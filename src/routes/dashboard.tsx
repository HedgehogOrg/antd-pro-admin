import { lazy } from 'react';
import { LineChartOutlined } from '@ant-design/icons';

const Dashboard = lazy(() => import('@/modules/dashboard/pages/Dashboard'));

const DashboardRoute = {
  path: 'dashboard',
  icon: <LineChartOutlined />,
  name: 'DASHBOARD',
  permission: 'DASHBOARD',
  component: <Dashboard />,
};

export default DashboardRoute;
