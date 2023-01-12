// import { Route } from 'react-router-dom';
// import { MenuDataItem } from '@ant-design/pro-layout';
// import { Route as RouteType } from '@ant-design/pro-layout/lib/typings';
// import intl from 'react-intl-universal';
// import { PermissionType } from 'stores/auth/user';
// import { BreadType } from '@/types/routes';
// import user from '@/stores/auth/UserStore';

// // 路由模块
// import DashboardRoute from './modules/dashboard';
// import RoleRoute from './modules/role';
// import UserRoute from './modules/user';

// // 合并路由
// const allRoutes: MenuDataItem[] = [
//   DashboardRoute,
//   UserRoute,
//   RoleRoute,
// ];

// const MyRouter = class {
//   // permission筛选后的路由
//   permissionRoutes: MenuDataItem[] = [];

//   // 面包屑
//   breadcrumbObj: BreadType = {};

//   // Route Element
//   routesElements = [];

//   // 初始化，动态生成路由
//   init() {
//     this.permissionRoutes = this.filterRoutes(allRoutes, user.permission);
//     this.getBreadcrumbFromRoutes(this.permissionRoutes);
//     this.routesElements = this.getRoutes(this.permissionRoutes);
//   }

//   // 处理多语言翻译
//   setIntlMenuName(route: MenuDataItem) {
//     return {
//       ...route,
//       name: route.name?.startsWith('menu.') ? intl.get(route.name || '') : route.name,
//     };
//   }

//   // 根据permission筛选路由
//   filterRoutes(routes: MenuDataItem[] = [], permissions: PermissionType[]) {
//     const afterFilterRoutes: MenuDataItem[] = [];
//     permissions?.forEach((permission: any) => {
//       routes.forEach((route) => {
//         if (route.permission === permission.menu) {
//           const tmpRoute = { ...this.setIntlMenuName(route) };
//           const tmpRoutes = route.routes;
//           if (permission.children?.length && tmpRoutes?.length) {
//             tmpRoute.routes = [...this.filterRoutes(tmpRoutes, permission.children)];
//           }
//           afterFilterRoutes.push(tmpRoute);
//         }
//       });
//     });
//     return afterFilterRoutes;
//   }

//   // 根据路由生成面包屑对象
//   getBreadcrumbFromRoutes(routes: RouteType[], name = '', path = '') {
//     routes.forEach((route) => {
//       const bread = name && route.name ? `${name}/${route.name}` : (name || route.name || '');
//       const key = `${(path && path !== '/') ? `${path}/` : ''}${route.path || ''}`;
//       if (route.routes?.length) {
//         this.getBreadcrumbFromRoutes(route.routes, bread, key);
//       }
//       if (key && bread) {
//         this.breadcrumbObj[key] = bread;
//       }
//     });
//   }

//   // 根据路由对象生成 Route Element
//   getRoutes(routes: RouteType[], parent?:string): any {
//     return (
//       routes.map((route) => {
//         let routeEles: JSX.Element[] = [];
//         if (route.path) {
//           const path = parent ? `${parent}/${route.path}` : route.path;
//           routeEles.push(<Route path={path} element={route.component} key={path} />);
//         }
//         if (route.routes?.length) {
//           routeEles = routeEles.concat(this.getRoutes(route.routes, route.path || ''));
//         }
//         return routeEles;
//       })
//     );
//   }
// };

// export default new MyRouter();

import { Route } from 'react-router-dom';
import { Route as RouteType } from '@ant-design/pro-layout/lib/typings';
import intl from '@/utils/intl';
import { PermissionTree } from '@/types/system';
import { BreadType } from '@/types/routes';
import permissions from '@/stores/permissions';
import { PermissionType } from '@/enums';
import { flattenTree } from '@/utils/utils';
import permissionCollection from '@/permission';

class Routers {
  // 由项目个性化传入
  allRoutes: RouteType[] = [];

  // permission筛选后的路由
  permissionRoutes: RouteType[] = [];

  // 第一个有效路由
  firstPath: string = '';

  // 面包屑
  breadcrumbObj: BreadType = {};

  // Route Element
  routesElements = [];

  // 初始化，动态生成路由
  init() {
    // 扁平化路由
    const afterFlattenRoutes = flattenTree(this.allRoutes, 'routes');
    // 根据权限过滤路由
    const afterFilterRoutes = this.filterRoutes(permissions.userMenuPermissions, afterFlattenRoutes);

    this.permissionRoutes = this.setIntl(afterFilterRoutes);

    if (localStorage.getItem('USE_MOCK')) {
      this.permissionRoutes = this.setIntl(this.allRoutes);
    }

    this.getBreadcrumbFromRoutes(this.permissionRoutes);
    this.routesElements = this.getRoutes(this.permissionRoutes);
    this.firstPath = this.getFirstPath(this.permissionRoutes);
  }

  // 根据permission筛选路由
  filterRoutes(userPermissions: PermissionTree[] = [], routes: RouteType[] = []) {
    const afterFilterRoutes: RouteType[] = [];
    userPermissions.forEach((permission: PermissionTree) => {
      routes.forEach((route) => {
        if (permissionCollection.collection.menu[route.permission] === permission.action) {
          // PS: path字段兼容远程或本地
          const tmpRoute = { ...route, path: permission.path || route.path };
          if (permission.children?.length && permission.children[0].type === PermissionType.MENU) {
            // 有子菜单的路由
            tmpRoute.routes = [...this.filterRoutes(permission.children, routes)];
          } else if (route.routes?.length) {
            // 隐藏的子路由需要携带上
            tmpRoute.routes = route.routes.filter((item) => item.hideInMenu);
          }
          afterFilterRoutes.push(tmpRoute);
        }
      });
    });
    return afterFilterRoutes;
  }

  // 批量处理多语言翻译
  setIntl(routes: RouteType[] = []) {
    return routes.map((route) => {
      const tmpRoute = { ...this.setIntlMenuName(route) };
      const tmpRoutes = route.routes;
      if (tmpRoutes?.length) {
        tmpRoute.routes = [...this.setIntl(tmpRoutes)];
      }
      return tmpRoute;
    });
  }

  // 处理多语言翻译
  setIntlMenuName(route: RouteType) {
    return {
      ...route,
      name: intl.menu(route.name) || route.name,
    };
  }

  // 根据路由生成面包屑对象
  getBreadcrumbFromRoutes(routes: RouteType[], parents: RouteType[] = [], path = '') {
    routes.forEach((route) => {
      const newParents = [...parents, route];
      const key = `${(path && path !== '/') ? `${path}/` : ''}${route.path || ''}`;
      if (route.routes?.length) {
        this.getBreadcrumbFromRoutes(route.routes, newParents, key);
      }
      if (key) {
        this.breadcrumbObj[key] = newParents as any;
      }
    });
  }

  // 根据路由对象生成 Route Element
  getRoutes(routes: RouteType[], parent?: string): any {
    return (
      routes.map((route) => {
        let routeEles: JSX.Element[] = [];
        let path = '';
        if (route.path) {
          path = parent ? `${parent}/${route.path}` : route.path;
          routeEles.push(<Route path={path} element={route.component} key={path} />);
        }
        if (route.routes?.length) {
          routeEles = routeEles.concat(this.getRoutes(route.routes, path || ''));
        }
        return routeEles;
      })
    );
  }

  // 获取第一个路由
  getFirstPath(routes: RouteType[]) {
    const firstRoute = flattenTree(routes, 'routes').find((route) => route.path);

    if (firstRoute) {
      return `/${firstRoute.path}`.replace('//', '/');
    }
    return '';
  }
}

export default new Routers();
