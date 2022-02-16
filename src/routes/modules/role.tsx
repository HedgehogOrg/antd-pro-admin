import { lazy } from 'react';
import { IdcardOutlined } from '@ant-design/icons';

const Role = lazy(() => import('../../modules/role/pages/Role'))

const RoleRoute = {
  name: 'menu.ROLE',
  icon: <IdcardOutlined />,
  permission: 'role',
  routes: [{
    path: 'role-list',
    permission: 'role-list',
    name: 'menu.ROLE_LIST',
    component: <Role />,
  }]
}



export default RoleRoute
