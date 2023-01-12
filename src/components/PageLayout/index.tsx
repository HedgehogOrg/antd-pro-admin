import {
  ReactChild, ReactFragment, ReactPortal, useState,
} from 'react';
import type { MenuDataItem, ProSettings } from '@ant-design/pro-layout';
import ProLayout, { SettingDrawer } from '@ant-design/pro-layout';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import MyRouter from '@/routes/router';
import userStore from '@/stores/auth/UserStore';
import MyBreadcrumb from '../MyBreadcrumb';
import styles from './index.module.less';
import MainPage from './MainPage';
// import { Platform } from '@/enums/index';

const LayoutSettingsDefault = {
  fixSiderbar: true,
  fixedHeader: true,
  siderWidth: 224,
};

function PageLayout(props: { TopBarLogout: (props: any) => JSX.Element }) {
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>(LayoutSettingsDefault);
  const location = useLocation();
  const defaultLogoSrc = '/assets/sumian_logo.png';
  const defaultSystemName = 'SuMian';
  // 项目自定义顶部栏
  const { TopBarLogout } = props;

  // 全屏
  const [params] = useSearchParams();
  if (params.get('fullscreen') === '1') {
    return <MainPage />;
  }

  return (
    <div
      id="pro-layout"
      style={{ height: '100vh' }}
      className={`${styles['pro-layout']}`}
    >
      <ProLayout
        logo={<img alt="" src={userStore.user.organization?.systemLogo || defaultLogoSrc} />}
        title={userStore.user.organization?.systemName || defaultSystemName}
        route={{
          routes: MyRouter.permissionRoutes,
        }}
        location={{
          pathname: location.pathname,
        }}
        menuItemRender={(item: MenuDataItem, dom: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined) => <Link to={item.path || ''}>{dom}</Link>}
        rightContentRender={() => <TopBarLogout userStore={userStore} />}
        headerContentRender={() => <MyBreadcrumb routes={MyRouter.permissionRoutes} pathname={location.pathname} />}
        {...settings}
      >
        <MainPage />
      </ProLayout>
      {
        // 生产环境隐藏悬浮的风格配置按钮
        process.env.APP_ENV !== 'prod' && (
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
        )
      }
    </div>
  );
}
export default PageLayout;
