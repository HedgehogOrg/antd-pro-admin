// / <reference path="./types/index.d.ts" />

import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import './styles/global.css';
import Config from './config/config';
import Router from './routes/index';

/* 用于 微前端 qiankun */
let basename:any;
if (window.__POWERED_BY_QIANKUN__) {
  basename = `/${Config.PROJECT_NAME}`;
}

const render = (props?: any) => {
  ReactDOM.render(
    <BrowserRouter basename={basename}>
      <Router />
    </BrowserRouter>,
    props.container ? props.container.querySelector('#root') : document.getElementById('root'),
  );
};

/* 非qiankun的独立运行状态下 */
if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {
  console.log('react app bootstraped');
}

/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props: any) {
  render(props);
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount(props: any) {
  ReactDOM.unmountComponentAtNode(
    props.container ? props.container.querySelector('#root') : document.getElementById('root'),
  );
}

/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
export async function update(props: any) {
  console.log('update props', props);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
