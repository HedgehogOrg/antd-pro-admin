/**
 * Author: Alvin
 * Modified By: diya
 * Created Date: 2022-04-19 11:33:02
 * Last Modified: 2022-04-22 14:12:33
 * Description:
 */
import { useState } from 'react';
import { UserType } from '@/types/stores/auth/user';
import userStore from '@/stores/auth/UserStore';
import permissionsStore from '@/stores/permissions';
import { PermissionTree } from '@/types/system';

/**
 * 获取token
 * @returns 用户token
 */
export const useToken = () => {
  const [token] = useState<string>(userStore.user.token || '');
  return token;
};

/**
 * 获取用户信息
 * @returns 用户信息
 */
export const useUser = () => {
  const [user] = useState<UserType>(userStore.user || {});
  return user;
};

/**
 * 获取用户所有权限
 * @returns 用户所有权限
 */
export const usePermission = () => {
  const [permission] = useState<PermissionTree[]>(permissionsStore.userPermissions);
  return permission;
};

/**
 * 获取用户菜单权限
 * @returns 用户菜单权限
 */
export const useMenuPermission = () => {
  const [permission] = useState<PermissionTree[]>(permissionsStore.userMenuPermissions);
  return permission;
};

/**
 * 获取用户按钮权限
 * @returns 用户按钮权限
 */
export const useButtonPermission = () => {
  const [permission] = useState<PermissionTree[]>(permissionsStore.userButtonPermissions);
  return permission;
};
