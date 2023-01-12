import { Navigate, useLocation } from 'react-router-dom';
import user from '@/stores/auth/UserStore';

export default function AuthRequire(props: any) {
  const { children } = props;
  const location = useLocation();

  return (
    // 只有登录了才可以访问子组件
    user.token ? children : <Navigate to="/login" state={{ from: location }} replace />
  );
}
