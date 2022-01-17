import React, { lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { observer } from 'mobx-react'
import user from '../stores/user';

// Layout
import App from '../App';
import AuthRequire from '../components/AuthRequire';
import PageLayout from '../components/PageLayout';

// 普通路由
import MyRouter from './MyRouter';

// 特殊页面
import Login from '../modules/login/pages/Login';
import DashboardRoute from './modules/dashboard';
const Page404 = lazy(() => import('../modules/error-page/pages/Page404'));

const Router = () => {

  if (user.token) {
    MyRouter.init()
  }

  return (
    <Routes>
      <Route path="/" element={<App />}>
        {/* fullscreen page */}
        <Route path='login' element={<Login />}></Route>
        {/* page with PageLayout */}
        <Route element={<AuthRequire><PageLayout /></AuthRequire>}>
          <Route index element={<Navigate to={DashboardRoute.path} />}></Route>
          { MyRouter.routesElements }
          <Route path="*" element={<Page404 />}></Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default observer(Router)
