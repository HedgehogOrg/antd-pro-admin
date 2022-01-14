import { Route } from 'react-router-dom';
import { MenuDataItem } from '@ant-design/pro-layout';
import { Route as RouteType } from '@ant-design/pro-layout/lib/typings';

// 路由
import DashboardRoute from './modules/dashboard';
import RoleRoute from './modules/role';
import UserRoute from './modules/user';

// 合并路由
export const allRoutes: MenuDataItem[] = [
  DashboardRoute,
  UserRoute,
  RoleRoute,
]

// 根据路由对象生成 Route Element
const getRoutes = (routes: RouteType[], parent?:string): any => {
  return (
    routes.map(route => {
      let routeEles: JSX.Element[] = []
      if (route.path) {
        const path = parent ? `${parent}/${route.path}` : route.path
        routeEles.push(<Route path={path} element={route.component} key={path} />)
      }
      if (route.routes?.length) {
        routeEles = routeEles.concat(getRoutes(route.routes, route.path || ''))
      }
      return routeEles
    })
  )
}

const OrganizeRoutes = getRoutes(allRoutes)

export default OrganizeRoutes
