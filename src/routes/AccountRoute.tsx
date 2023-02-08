import { lazy } from 'react';

const Account = lazy(() => import('@/modules/account/pages/Account'));

const AccountRoute = {
  path: 'account',
  name: 'SYSTEM_ACCOUNT',
  permission: 'SYSTEM_ACCOUNT',
  component: <Account />,
};

export default AccountRoute;
