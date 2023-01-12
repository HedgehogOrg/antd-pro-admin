import { MenuDataItem } from '@ant-design/pro-layout';
import { Route as RouteType } from '@ant-design/pro-layout/lib/typings';
import { Location } from 'react-router-dom';

// 面包屑基础对象
export interface BreadType {
  [key: string]: RouteType[]
}

// 含路由的面包屑
export interface MyBreadcrumbType {
  routes: MenuDataItem[],
  pathname: string
}

// location.state
export interface LocationStateType {
  from: Location
}
