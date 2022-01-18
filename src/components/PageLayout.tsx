import React, { useState, Suspense } from 'react';
import type { ProSettings } from '@ant-design/pro-layout';
import ProLayout, { SettingDrawer, PageLoading } from '@ant-design/pro-layout';
import { Outlet, Link, useLocation } from 'react-router-dom';
import MyRouter from '../routes/MyRouter';
import TopBarLogout from './TopBarLogout';
import MyBreadcrumb from './MyBreadcrumb';

const PageLayout =() => {
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({ fixSiderbar: true });
  const location = useLocation()

  return (
    <div
      id="pro-layout"
      style={{ height: '100vh' }}
    >
      <ProLayout
        route={{
          routes: MyRouter.permissionRoutes
        }}
        location={{
          pathname: location.pathname,
        }}
        menuItemRender={(item, dom) => <Link to={item.path || ''}>{dom}</Link>}
        rightContentRender={() => <TopBarLogout />}
        headerContentRender={() => <MyBreadcrumb routes={MyRouter.permissionRoutes} pathname={location.pathname} />}
        {...settings}
      >
        <Suspense fallback={<PageLoading />}>
          <Outlet></Outlet>
        </Suspense>
      </ProLayout>
      <SettingDrawer
        enableDarkTheme
        getContainer={() => document.getElementById('pro-layout')}
        settings={settings}
        onSettingChange={(changeSetting) => {
          /**
           * 修改primaryColor无效是因为引入了babel-plugin-import，采用了按需加载，两者取其一
           */
          setSetting(changeSetting);
        }}
        disableUrlParams
      />
    </div>
  );
};
export default PageLayout
