import { lazy } from 'react';

const Role = lazy(() => import('../../modules/role/pages/Role'))

const RoleRoute = {
  name: '角色管理',
  routes: [{
    path: 'role-list',
    name: '角色列表',
    component: <Role />,
  }]
}



export default RoleRoute
