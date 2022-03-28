import { MenuDataItem } from '@ant-design/pro-layout';

// 面包屑基础对象
export interface BreadType {
  [key: string]: string
}

// 含路由的面包屑
export interface MyBreadcrumbType {
  routes: MenuDataItem[],
  pathname: string
}

// location.state
export interface LocationStateType {
  from: { pathname: string }
}
