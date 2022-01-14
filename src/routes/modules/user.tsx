import { lazy } from 'react';

const UserList = lazy(() => import('../../modules/user/pages/UserList'))
const UserSetting = lazy(() => import('../../modules/user/pages/UserSetting'))
const UserDetail = lazy(() => import('../../modules/user/pages/UserDetail'))
const UserNew = lazy(() => import('../../modules/user/pages/UserNew'))

const UserRoute = {
  name: '用户管理',
  routes: [{
    path: 'user-list',
    name: '用户列表',
    component: <UserList />,
    routes: [{
      path: 'user-detail/:id',
      name: '用户详情',
      component: <UserDetail />,
      hideInMenu: true
    }, {
      path: 'user-new',
      name: '新增用户',
      component: <UserNew />,
      hideInMenu: true
    }]
  },{
    path: 'user-setting',
    name: '用户配置',
    component: <UserSetting />,
  }]
}

export default UserRoute
