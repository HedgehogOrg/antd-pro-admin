import { Navigate } from 'react-router-dom';
import UserStore from '@/stores/auth/UserStore';
import Login from '@/modules/auth/login/pages/Login';
// import HospitalLogin from '@/modules/auth/hospital-login/pages/Login';

export default function PageLogin(props: { firstPath: string }) {
  const { firstPath } = props;
  // const to = UserStore.historyFrom || firstPath;
  // console.log('firstPath', firstPath);

  // 院内版或是社会版登录页
  // const loginEle = UserStore.innerHospital ? <HospitalLogin /> : <Login />;

  return (
    // 登录后不可访问的路径，通常是登录页面
    // 需要拿到路由数据才能跳转
    UserStore.token && firstPath
      // 已登录
      ? <Navigate to={firstPath} replace />
      // 未登录
      : <Login />
  );
}
