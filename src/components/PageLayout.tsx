import React, { useState, Suspense } from 'react';
import type { ProSettings } from '@ant-design/pro-layout';
import ProLayout, { SettingDrawer, PageLoading } from '@ant-design/pro-layout';
import { Outlet, Link } from 'react-router-dom';
import { allRoutes } from '../routes/OrganizeRoutes';
import { useLocation } from 'react-router-dom';
import TopBarLogout from './TopBarLogout';

const PageLayout =() => {
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({ fixSiderbar: true });
  const location = useLocation()

  return (
    <div
      id="test-pro-layout"
      style={{ height: '100vh' }}
    >
      <ProLayout
        route={{
          routes: allRoutes
        }}
        location={{
          pathname: location.pathname,
        }}
        menuItemRender={(item, dom) => (
          <Link to={item.path || ''}>{dom}</Link>
        )}
        rightContentRender={() => (
          <div>
            <TopBarLogout />
          </div>
        )}
        {...settings}
      >
        <Suspense fallback={<PageLoading />}>
          <Outlet></Outlet>
        </Suspense>
      </ProLayout>
      <SettingDrawer
        enableDarkTheme
        getContainer={() => document.getElementById('test-pro-layout')}
        settings={settings}
        onSettingChange={(changeSetting) => {
          setSetting(changeSetting);
        }}
        disableUrlParams
      />
    </div>
  );
};
export default PageLayout
