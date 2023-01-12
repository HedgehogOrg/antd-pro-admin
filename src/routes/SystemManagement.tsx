// import { lazy } from 'react';
import {
  SettingOutlined,
  // ApartmentOutlined,
} from '@ant-design/icons';
import SystemModulesRoute from './SystemModulesRoute';
// import AccountRoute from './AccountRoute';
// import RoleListRoute from './RoleListRoute';
// import SystemLogsRoute from './SystemLogsRoute';

// const DepartmentList = lazy(() => import('@/modules/departments'));
// const WarmPromptTemplate = lazy(() => import('@/modules/WarmPrompt-template'));
// const NoticeSetting = lazy(() => import('@/components/Notice/NoticeSetting'));

const SystemRoute = {
  name: 'SYSTEM',
  permission: 'SYSTEM',
  icon: <SettingOutlined />,
  routes: [
    SystemModulesRoute,
    // AccountRoute,
    // {
    //   path: 'department',
    //   icon: <ApartmentOutlined />,
    //   name: 'DEPARTMENT',
    //   permission: 'DEPARTMENT',
    //   component: <DepartmentList />,
    // },
    // RoleListRoute,
    // {
    //   name: 'MESSAGE_CENTER',
    //   permission: 'MESSAGE_CENTER',
    //   routes: [
    //     {
    //       path: 'warmPrompt-template',
    //       name: 'WARMPROMPT_TEMPLATE',
    //       permission: 'WARMPROMPT_TEMPLATE',
    //       component: <WarmPromptTemplate />,
    //     },
    //     {
    //       path: 'notice-setting',
    //       name: 'NOTICE_SETTING',
    //       permission: 'NOTICE_SETTING',
    //       component: <NoticeSetting />,
    //     },
    //   ],
    // },
    // SystemLogsRoute,

  ],
};

export default SystemRoute;
