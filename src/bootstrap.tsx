// / <reference path="./types/index.d.ts" />

import { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
// 公用的基础架构
import Router from './routes/base';
import './styles/global.css';

/* 项目个性化配置 start */
import SpinLoading from './components/SpinLoading';
import lang from '@/locales/index';

// 普通路由模块
import allRoutes from './routes';
import permissionCollection from './customPermission';
import TopBarLogout from './components/TopBarLogout';
/* 项目个性化配置 end */

ReactDOM.render(
  <HashRouter>
    <Suspense fallback={<SpinLoading tip="" />}>
      <Router lang={lang} permissionCollection={permissionCollection} allRoutes={allRoutes} TopBarLogout={TopBarLogout} />
    </Suspense>
  </HashRouter>,
  document.getElementById('root'),
);
