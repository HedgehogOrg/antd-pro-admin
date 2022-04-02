import { lazy } from 'react';
import { TeamOutlined } from '@ant-design/icons';

const UserList = lazy(() => import('../../modules/user/pages/UserList'));
const UserSetting = lazy(() => import('../../modules/user/pages/UserSetting'));
const UserDetail = lazy(() => import('../../modules/user/pages/UserDetail'));
const UserNew = lazy(() => import('../../modules/user/pages/UserNew'));

const UserRoute = {
  name: 'menu.USER',
  icon: <TeamOutlined />,
  permission: 'user',
  routes: [{
    path: 'user-list',
    permission: 'user-list',
    name: 'menu.USER_LIST',
    component: <UserList />,
    routes: [{
      path: 'user-detail/:id',
      permission: 'user-detail',
      name: 'menu.USER_DETAIL',
      component: <UserDetail />,
      hideInMenu: true,
    }, {
      path: 'user-new',
      permission: 'user-new',
      name: 'menu.USER_NEW',
      component: <UserNew />,
      hideInMenu: true,
    }],
  }, {
    path: 'user-setting',
    permission: 'user-setting',
    name: 'menu.USER_SETTING',
    component: <UserSetting />,
  }],
};

export default UserRoute;
