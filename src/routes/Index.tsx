/// <reference path="../index.d.ts" />

import React, { Component, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { observer } from 'mobx-react'
import { Spin } from 'antd';

import App from '../App';
import AuthRequire from '../components/AuthRequire';
import PageLayout from '../components/PageLayout';

const Login = lazy(() => import('../modules/login/pages/Login'));
const Page404 = lazy(() => import('../modules/error-page/pages/Page404'));
const Dashboard = lazy(() => import('../modules/dashboard/pages/Dashboard'));

interface Props {

}
interface State {

}

/* 用于 微前端 qiankun */
let basename:any = undefined
if (window.__POWERED_BY_QIANKUN__) {
  basename = '/sd-department-admin-2'
}

@observer
class Router extends Component<Props, State> {
  state = {}

  render() {
    return (
      <BrowserRouter basename={basename}>
        <Suspense fallback={<Spin />}>
          <Routes>
            <Route path="/" element={<App />}>
              {/* fullscreen page */}
              <Route path='login' element={<Login />}></Route>
              {/* page with PageLayout */}
              <Route element={<AuthRequire><PageLayout /></AuthRequire>}>
                <Route index element={<Dashboard />}></Route>
                <Route path="dashboard" element={<Dashboard />}></Route>
                <Route path="*" element={<Page404 />}></Route>
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    )
  }
}

export default Router
