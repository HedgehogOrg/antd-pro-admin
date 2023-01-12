import { makeAutoObservable, runInAction } from 'mobx';
import permissionFetch from '@/apis/PermissionFetch';
import { PermissionTree } from '@/types/system/index.d';
import { addParents, flattenTree, sort } from '@/utils/utils';
import localStore from '@/utils/localStore';
import { PermissionType } from '@/enums';

/**
 * 从权限树中筛选出菜单树
 * @param arr 树形权限
 * @returns 树形菜单
 */
function menuFilter(arr: PermissionTree[]) {
  return arr.filter((item) => {
    const isMenu = item.type === PermissionType.MENU;
    if (isMenu && item.children?.length) {
      Object.assign(item, { children: menuFilter(item.children) });
    }
    return isMenu;
  });
}

class Permission {
  constructor() {
    makeAutoObservable(this);
    this.init();
  }

  // 限制最多多少级菜单
  MENU_MAX_LEVEL = 3;

  // 所有权限（菜单+按钮）
  // allPermissions: PermissionTree[] = [];

  // 所有菜单
  // allMenuPermissions: PermissionTree[] = [];

  // 用户拥有的权限（菜单+按钮）
  userPermissions: PermissionTree[] = [];

  // 用户拥有的菜单
  userMenuPermissions: PermissionTree[] = [];

  // 用户拥有的按钮
  userButtonPermissions: PermissionTree[] = [];

  async init() {
    // 刷新时获取本地已存的权限数据
    const localUserPermission = await localStore.getItem('ADMIN_ACLS');
    if (localUserPermission) {
      runInAction(() => {
        this.setPermission(localUserPermission);
      });
    }
  }

  // 获取远端权限并储存
  getUserPermissions() {
    return permissionFetch.aclsAccountTreeList().then((result) => {
      const permission = sort(result);
      runInAction(() => {
        this.setPermission(permission);
      });
      localStore.setItem('ADMIN_ACLS', permission);
      if (!result.length) {
        return Promise.reject({
          message: 'FORBIDDEN',
          code: 'FORBIDDEN',
          statusCode: 403,
        });
      }
      return permission;
    }).catch((error) => Promise.reject(error));
  }

  // 菜单/按钮权限赋值
  setPermission(permission: PermissionTree[]) {
    this.userPermissions = addParents(permission);
    this.userMenuPermissions = menuFilter(this.userPermissions);
    this.userButtonPermissions = flattenTree(permission).filter((item) => item.type === PermissionType.BUTTON).map((item) => item.action);
  }
}

export default new Permission();
