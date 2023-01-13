import { TmpPermissionTree } from '@/types/system';
import { PermissionType } from '@/enums';

/**
 * @param acls  完整的树形结构权限列表
 * @param id    要查找的某个权限项id
 * @returns     要查找的权限项，该权限项在正常情况下必然存在
 */
function findDeep(acls: TmpPermissionTree[], id: number) : any {
  for (let i = 0; i < acls.length; i++) {
    if (acls[i].id === id) {
      return acls[i];
    }

    if (acls[i].children && acls[i].children.length) {
      const res = findDeep(acls[i].children, id);

      if (res) {
        return res;
      }
    }
  }

  return undefined;
}

// 关联API，菜单不可选择
function disableMenuCheckbox(acls: TmpPermissionTree[]) {
  acls.forEach((acl: TmpPermissionTree) => {
    // eslint-disable-next-line no-param-reassign
    acl.disabled = acl.type === PermissionType.MENU;
    if (acl.children && acl.children.length > 0) {
      disableMenuCheckbox(acl.children);
    }
  });

  return acls;
}

export {
  findDeep,
  disableMenuCheckbox,
};
