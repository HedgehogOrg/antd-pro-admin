/// <reference path="../index.d.ts" />

import React, { Component, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { observer } from 'mobx-react'

// Layout
import App from '../App';
import AuthRequire from '../components/AuthRequire';
import PageLayout from '../components/PageLayout';

// 普通路由
import OrganizeRoutes from './OrganizeRoutes';

// 特殊页面
import Login from '../modules/login/pages/Login';
const Page404 = lazy(() => import('../modules/error-page/pages/Page404'));

/* 用于 微前端 qiankun */
let basename:any = undefined
if (window.__POWERED_BY_QIANKUN__) {
  basename = '/sd-department-admin-2'
}

@observer
class Router extends Component {

  render() {
    return (
      <BrowserRouter basename={basename}>
        <Routes>
          <Route path="/" element={<App />}>
            {/* fullscreen page */}
            <Route path='login' element={<Login />}></Route>
            {/* page with PageLayout */}
            <Route element={<AuthRequire><PageLayout /></AuthRequire>}>
              { OrganizeRoutes }
              <Route path="*" element={<Page404 />}></Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    )
  }
}

export default Router
