import { Method, PermissionType } from '@/enums';
import { Pages, Paginations } from '@/types/common';

/**
 * 权限列表请求参数对象
 */
export type PermissionListParams = {
  name?: string;
  sort?: string;
  search?: string;
  expend?: string;
  attributes?: string[]
} & Partial<Pages>;

/**
 * 权限 item
 */
export type PermissionItemType = {
  id: number;
  name: string;
  description: string;
  parentId: number;
  level: number;
  type: PermissionType;
  menu: string;
  path: string;
  action: number;
  icon: string;
  sort: number;
  method: Method;
  apiPath: string;
  status: number;
} & DateTime;

/**
 * 权限列表
 */
export type PermissionListType = {
  items: AclsItemType[]
} & Paginations & Pages;

/**
 * 树形权限列表
 */
export interface PermissionTree {
  id?: number;
  name: string;
  description: string;
  parentId: number | Array;
  level: number;
  type: PermissionType;
  menu: string;
  path: string;
  children: PermissionTree[];
  action: string;
  icon: string;
  sort: number;
  method: Method;
  apiPath: string;
  status?: number;
  aclIds: null | number[];
  isShow: number;
}
/**
 * 选择菜单时用到
 */
interface TmpPermissionTree extends PermissionTree {
  actions?: TmpPermissionTree[];
  children: TmpPermissionTree[];
  parents?: TmpPermissionTree[];
  disabled?: boolean;
}

/**
 * 编辑权限
 */
export interface EditPermissionProps {
  // platform: Platform;
  isModalVisible: boolean;
  setIsModalVisible: Function;
  aclsData: TmpPermissionTree[];
  treeData: TmpPermissionTree[];
  editItem: TmpPermissionTree;
  isEdit: boolean;
  onEditOk: Function;
}

/**
 * 删除权限
 */
export interface DeletePermissionProps {
  // platform: Platform;
  deleteItem: TmpPermissionTree;
  onDeleteOk?: Function;
  onAfterClick?: Function;
}

/**
 * 按钮权限属性
 */
export interface ButtonPermissionProps {
  // platform: Platform;
  aclsData: TmpPermissionTree[];
  permission: PermissionTree;
  editRow: Function;
  onDeleteOk: Function;
}

/**
 * 筛选菜单权限
 */
export interface FilterMenuPermission {
  text: string;
  value: string;
  children: filterMenuPermission[];
}

/**
 * 平台类型属性
 */
export interface ModulePanelProps {
  // platform: Platform;
  treeListApi: Function;
}
