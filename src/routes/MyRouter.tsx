import { Route } from 'react-router-dom';
import { MenuDataItem } from '@ant-design/pro-layout';
import { Route as RouteType } from '@ant-design/pro-layout/lib/typings';
import intl from 'react-intl-universal';
import { PermissionType } from '@/types/stores/user';
import { BreadType } from '@/types/routes';
import user from '@/stores/user';

// 路由模块
import DashboardRoute from './modules/dashboard';
import RoleRoute from './modules/role';
import UserRoute from './modules/user';

// 合并路由
const allRoutes: MenuDataItem[] = [
  DashboardRoute,
  UserRoute,
  RoleRoute,
];

const MyRouter = class {
  // permission筛选后的路由
  permissionRoutes: MenuDataItem[] = [];

  // 面包屑
  breadcrumbObj: BreadType = {};

  // Route Element
  routesElements = [];

  // 初始化，动态生成路由
  init() {
    this.permissionRoutes = this.filterRoutes(allRoutes, user.permission);
    this.getBreadcrumbFromRoutes(this.permissionRoutes);
    this.routesElements = this.getRoutes(this.permissionRoutes);
  }

  // 处理多语言翻译
  setIntlMenuName(route: MenuDataItem) {
    return {
      ...route,
      name: route.name?.startsWith('menu.') ? intl.get(route.name || '') : route.name,
    };
  }

  // 根据permission筛选路由
  filterRoutes(routes: MenuDataItem[] = [], permissions: PermissionType[]) {
    const afterFilterRoutes: MenuDataItem[] = [];
    permissions?.forEach((permission: any) => {
      routes.forEach((route) => {
        if (route.permission === permission.menu) {
          const tmpRoute = { ...this.setIntlMenuName(route) };
          const tmpRoutes = route.routes;
          if (permission.children?.length && tmpRoutes?.length) {
            tmpRoute.routes = [...this.filterRoutes(tmpRoutes, permission.children)];
          }
          afterFilterRoutes.push(tmpRoute);
        }
      });
    });
    return afterFilterRoutes;
  }

  // 根据路由生成面包屑对象
  getBreadcrumbFromRoutes(routes: RouteType[], name = '', path = '') {
    routes.forEach((route) => {
      const bread = name && route.name ? `${name}/${route.name}` : (name || route.name || '');
      const key = `${(path && path !== '/') ? `${path}/` : ''}${route.path || ''}`;
      if (route.routes?.length) {
        this.getBreadcrumbFromRoutes(route.routes, bread, key);
      }
      if (key && bread) {
        this.breadcrumbObj[key] = bread;
      }
    });
  }

  // 根据路由对象生成 Route Element
  getRoutes(routes: RouteType[], parent?:string): any {
    return (
      routes.map((route) => {
        let routeEles: JSX.Element[] = [];
        if (route.path) {
          const path = parent ? `${parent}/${route.path}` : route.path;
          routeEles.push(<Route path={path} element={route.component} key={path} />);
        }
        if (route.routes?.length) {
          routeEles = routeEles.concat(this.getRoutes(route.routes, route.path || ''));
        }
        return routeEles;
      })
    );
  }
};

export default new MyRouter();
