import {
  RolePermissionItem,
  ExtendedRolePermissionItem,
} from '@/types/stores/role';
import { PermissionType } from '@/enums';

/**
 * @param menus 完整的树形结构权限列表
 * @returns     所有权限项id数组
 */
function getAllAccessIds(menus: RolePermissionItem[]) {
  let res: number[] = [];

  menus.forEach((menu: RolePermissionItem) => {
    res.push(menu.id);
    if (menu.children && menu.children.length) {
      res = [...res, ...getAllAccessIds(menu.children)];
    }
  });

  return res;
}

/**
 * @param menus 完整的树形结构权限列表
 * @returns     所有菜单权限id数组
 */
function getAllMenuIds(menus: RolePermissionItem[]) {
  let res: number[] = [];

  menus.forEach((menu: RolePermissionItem) => {
    if (menu.type === 1) {
      res.push(menu.id);
    }

    if (menu.children && menu.children.length) {
      res = [...res, ...getAllMenuIds(menu.children)];
    }
  });

  return res;
}

/**
 * @param menus 完整的树形结构权限列表
 * @returns     菜单的子菜单权限id数组
 */
function addSubIds(menu: ExtendedRolePermissionItem) {
  const tempMenu = menu;
  tempMenu.submenuIds = [];
  tempMenu.subIds = [];

  tempMenu.children.forEach((child: ExtendedRolePermissionItem) => {
    // 过滤隐藏的权限
    if (child.isShow) {
      tempMenu.subIds.push(child.id);
    }

    if (child.type === 1) {
      tempMenu.submenuIds.push(child.id);
    }

    if (child.children) {
      tempMenu.submenuIds = [...tempMenu.submenuIds, ...addSubIds(child).submenuIds];
      tempMenu.subIds = [...tempMenu.subIds, ...addSubIds(child).subIds];
    }
  });

  return {
    submenuIds: tempMenu.submenuIds,
    subIds: tempMenu.subIds,
  };
}

/**
 * @param menus 完整的树形结构权限列表
 * @param id    要查找的某个权限项id
 * @returns     要查找的权限项，该权限项在正常情况下必然存在
 */
function findDeep(menus: ExtendedRolePermissionItem[], id: number) : any {
  for (let i = 0; i < menus.length; i++) {
    if (menus[i].id === id) {
      return menus[i];
    }

    if (menus[i].children && menus[i].children.length) {
      const res = findDeep(menus[i].children, id);

      if (res) {
        return res;
      }
    }
  }

  return undefined;
}

/**
 * 递归取消没有选中任何子菜单的权限项
 * @param menus    完整的树形结构权限列表
 * @param tempIds  选中的权限项id数组
 * @param pid      向上递归的父id
 * @returns        处理后的权限id数组
 */
function removeEmptyParent(menus: ExtendedRolePermissionItem[], tempIds: number[], pid: number) {
  const parent = findDeep(menus, pid);
  const { submenuIds } = parent;
  const childrenUnchecked = submenuIds.every((submenuId: number) => !tempIds.includes(submenuId));

  if (childrenUnchecked) {
    tempIds.splice(tempIds.indexOf(pid), 1);
  }

  if (parent.parentId !== 0) {
    removeEmptyParent(menus, tempIds, parent.parentId);
  }

  return tempIds;
}

/**
 * 格式化后端返回的权限列表，添加submenuIds, parentIds, actions, subMenus字段
 * submenuIds：  所有子菜单id数组
 * subIds：      所有子菜单/子操作id数组
 * parentIds：   所有父菜单id数组
 * subMenus:     子菜单数组（不包含子操作）
 * actions：     子操作数组（不包含子菜单）
 * @param menus  完整的树形结构权限列表
 * @param pids   上级权限的parentIds数组
 * @returns      格式化后的权限列表
 */
function formatTreeData(menus: ExtendedRolePermissionItem[], pids: number[]) : ExtendedRolePermissionItem[] {
  if (!menus) return [];

  menus.map((menu: ExtendedRolePermissionItem) => {
    const tempMenu = menu;
    if (tempMenu.parentId === 0) {
      tempMenu.parentIds = [];
    } else {
      tempMenu.parentIds = [...pids, tempMenu.parentId];
    }

    if (tempMenu.children && tempMenu.children.length) {
      tempMenu.submenuIds = addSubIds(tempMenu).submenuIds;
      tempMenu.subIds = addSubIds(tempMenu).subIds;
      tempMenu.subMenus = tempMenu.children.filter((item: RolePermissionItem) => item.type === PermissionType.MENU);
      // 过滤隐藏的权限按钮
      tempMenu.actions = tempMenu.children.filter((item: RolePermissionItem) => item.type === PermissionType.BUTTON && item.isShow === 1);

      if (tempMenu.actions.length) {
        tempMenu.actions.forEach((action: ExtendedRolePermissionItem) => {
          const tempAction = action;
          tempAction.parentIds = [...tempMenu.parentIds, tempMenu.id];
        });
      }

      // 最后一级菜单没有子菜单，如果保留subMenus，会多余显示展开/收起操作按钮
      if (tempMenu.subMenus.length === 0) {
        Reflect.deleteProperty(tempMenu, 'subMenus');
      }

      formatTreeData(tempMenu.children, tempMenu.parentIds);
    } else {
      // children为定义或为空数组时，不需要menu.subMenus
      tempMenu.submenuIds = [];
      tempMenu.subIds = [];
      tempMenu.actions = [];
    }

    return tempMenu;
  });

  return menus;
}

export {
  getAllMenuIds,
  getAllAccessIds,
  findDeep,
  removeEmptyParent,
  formatTreeData,
};
