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


@observer
class Router extends Component<Props, State> {
  state = {}

  render() {
    return (
      <BrowserRouter>
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
