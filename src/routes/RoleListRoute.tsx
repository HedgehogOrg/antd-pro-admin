import { lazy } from 'react';

const RoleList = lazy(() => import('@/modules/role-management/pages/RoleList'));
const CreateRole = lazy(() => import('@/modules/role-management/pages/CreateRole'));
const EditRole = lazy(() => import('@/modules/role-management/pages/EditRole'));

const RoleListRoute = {
  path: 'role-list',
  name: 'ROLE',
  permission: 'ROLE',
  component: <RoleList />,
  routes: [{
    path: 'create-role',
    name: 'CREATE_ROLE',
    component: <CreateRole />,
    hideInMenu: true,
  }, {
    path: 'edit-role/:id',
    name: 'EDIT_ROLE',
    component: <EditRole />,
    hideInMenu: true,
  }],
};

export default RoleListRoute;
