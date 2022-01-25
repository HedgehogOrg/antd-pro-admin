import { lazy } from 'react';

const Role = lazy(() => import('../../modules/role/pages/Role'))

const RoleRoute = {
  name: 'menu.ROLE',
  permission: 'role',
  routes: [{
    path: 'role-list',
    permission: 'role-list',
    name: 'menu.ROLE_LIST',
    component: <Role />,
  }]
}



export default RoleRoute
