/// <reference path="../index.d.ts" />

import React, { Component, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { observer } from 'mobx-react'

import App from '../App';
import { Spin } from 'antd';

import PageLayout from '../components/PageLayout';
const Login = lazy(() => import('../pages/login/Login'));
const Page404 = lazy(() => import('../pages/page404/Page404'));
const Dashboard = lazy(() => import('../pages/dashboard/Dashboard'));

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
              <Route path='login' element={<Login />}></Route>
              <Route element={<PageLayout />}>
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
