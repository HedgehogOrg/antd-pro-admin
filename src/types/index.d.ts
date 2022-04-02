// / <reference types="react-scripts" />

declare module '*.module.less' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

/* 用于 微前端 qiankun */
interface Window {
  __POWERED_BY_QIANKUN__: null
}
