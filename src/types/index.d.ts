declare module '*.module.less' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
/* 用于 微前端 qiankun */
interface Window {
  __POWERED_BY_QIANKUN__: null
}
declare let Aliplayer;

/* 公用基础架构参数 */
interface ProjectProps {
  lang: Language;
  // 菜单和按钮权限值集合
  permissionCollection: { [key: string]: any };
  // 普通路由
  allRoutes: MenuDataItem[];
  // 能公共访问的路由
  publicRoutes?: MenuDataItem[];
  // 院内版受试者的路由
  // innerHospitalPatientRoutes?: MenuDataItem[];
  TopBarLogout: (props: any) => JSX.Element;
  // 拦截器
  interceptors?: Function;
}
