import { Outlet } from 'react-router-dom';
import ProSkeleton from '@ant-design/pro-skeleton';
import WaitForRouterReady from '../WaitForRouterReady';
import UserStore from '@/stores/auth/UserStore';

function MainPage() {
  return (
    <WaitForRouterReady fallback={<ProSkeleton type="descriptions" />}>
      <div className="app">
        {/* 让页面组件可以通过 UseOutletContext 获取公用store */}
        <Outlet context={{ locale: UserStore.language }} />
      </div>
    </WaitForRouterReady>
  );
}

export default MainPage;
