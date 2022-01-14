import { Route } from 'react-router-dom';
import { MenuDataItem } from '@ant-design/pro-layout';
import { Route as RouteType } from '@ant-design/pro-layout/lib/typings';

// 路由模块
import DashboardRoute from './modules/dashboard';
import RoleRoute from './modules/role';
import UserRoute from './modules/user';

// 合并路由
export const allRoutes: MenuDataItem[] = [
  DashboardRoute,
  UserRoute,
  RoleRoute,
]

interface BreadType {
  [key: string]: string
}
// 根据路由生成面包屑对象
export const breadcrumbObj: BreadType = {}
const preprocessRoutes = (routes: RouteType[], name: string = '', path: string = '') => {
  routes.forEach(route => {
    let bread = name && route.name ? `${name}/${route.name}` : (name || route.name || '')
    let key = `${(path && path !== '/') ? `${path}/` : ''}${route.path || ''}`
    if (route.routes?.length) {
      preprocessRoutes(route.routes, bread, key)
    }
    if (key && bread) {
      breadcrumbObj[key] = bread
    }
  })
}
preprocessRoutes(allRoutes)

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
