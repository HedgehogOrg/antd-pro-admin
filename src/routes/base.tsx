import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import intl from 'react-intl-universal';
import { ConfigProvider } from 'antd';

// Layout
import App from '../App';
import PageLayout from '@/components/PageLayout';
import AuthRequire from '@/components/AuthRequire';

/* 输出 */
import userStore from '@/stores/auth/UserStore';
import request from '@/utils/request';
import permissionsStore from '@/stores/permissions';
import permission from '@/permission';

// 路由类
import myRouters from './router';

// 特殊页面
import PageLogin from '@/components/PageLogin';

export {
  myRouters,
  userStore,
  permissionsStore,
  permission as permissionCollection,
  request,
};

const Page404 = lazy(() => import('@/modules/error-page/pages/Page404'));

/**
 * 公用基础架构
 * @param props 项目个性化配置（后续可按实际需求扩展）
 */
function Router(props: ProjectProps) {
  const {
    // 项目传入的多语言
    lang,
    // 项目传入的权限对照表
    permissionCollection,
    // 项目传入的所有路由
    allRoutes,
    // 项目传入的公开路由
    publicRoutes,
    // 项目传入的院内版受试者路由
    // innerHospitalPatientRoutes = [],
    // 项目传入的顶部栏
    TopBarLogout,
    // 拦截器
    interceptors,
  } = props;

  permission.collection = permissionCollection;
  /**
   * 初始化语言包
   */
  intl.init({
    currentLocale: userStore.language,
    locales: { [userStore.language]: lang.locales[userStore.language] },
    warningHandler() { },
  });

  /**
   * 初始化路由
   */
  myRouters.allRoutes = allRoutes;
  if (userStore.token) {
    myRouters.init();
  }

  // 拦截器（目前用于组织端的带code登录）
  if (interceptors) {
    // 可根据后期需要增加参数
    const result = interceptors({ userStore });
    if (result) {
      return result;
    }
  }

  // // 是否受试者登录类型
  // const patientAccount = userStore.innerHospitalAccountType === InnerHospitalAccountType.PATIENT;
  // // 受试者版firstPath
  // const patientAccountFirstPath = innerHospitalPatientRoutes.length ? innerHospitalPatientRoutes[0].path : '';
  // let { firstPath } = myRouters;
  // if (patientAccount) {
  //   firstPath = patientAccountFirstPath;
  // }

  return (
    <ConfigProvider locale={lang.antdLocales[userStore.language]}>
      <Routes>
        <Route path="/" element={<App />}>
          {/* fullscreen page */}
          {publicRoutes?.map((item) => (<Route path={item.path} element={item.component} key={item.path} />))}
          <Route path="login" element={<PageLogin firstPath={myRouters.firstPath} />} />
          <Route element={<AuthRequire><PageLayout TopBarLogout={TopBarLogout} /></AuthRequire>}>
            <Route index element={<Navigate to={myRouters.firstPath} />} />
            {myRouters.routesElements}
            <Route path="*" element={<Page404 />} />
          </Route>

        </Route>
      </Routes>
    </ConfigProvider>
  );
}

export default observer(Router);
