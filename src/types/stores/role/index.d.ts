import { PermissionType } from '@/enums';

// 角色列表
export interface RoleItem {
  id: number,
  name: string,
  description: string,
  userCount: number,
  aclIds: number[],
  scopeType: number,
  status: number,
  createdAt: number,
  updatedAt: number,
}

export interface GetRoleItemResponseType {
  id: number,
  name: string,
  description: string,
  acls: Array,
  scopeType: number,
  type: number,
  organizations: RoleOrganizationItem[],
  status: number,
  createdAt: number,
  updatedAt: number,
}

export interface RoleOrganizationItem {
  id: number,
  organizationId: number,
  roleId: nunber,
}

// 创建角色
export interface CreateRoleRequestType {
  name: string,
  description?: string,
  aclIds: number[],
  scopeType: number,
  organizationIds?: number[],
  type?: 0,
}

// 创建角色返回数据类型

// 编辑角色
export interface UpdateRoleRequestType extends CreateRoleRequestType {
  id: number,
}

export interface OrganizationItem {
  id: number,
  name: string,
}
export interface GetOrganizationRequestType {
  attributes?: string[],
}

// 角色权限
export interface RolePermissionItem {
  id: number;
  name: string;
  description: string;
  parentId: number;
  level: number;
  type: PermissionType;
  path: string;
  children: ExtendedRolePermissionItem[];
  action: string;
  icon: string;
  sort: number;
  status: number;
  isShow: number;
  aclIds: null | number[];
  createdAt: number;
  updatedAt: number;
}

// 包含自定义字段的角色权限
export interface ExtendedRolePermissionItem extends RolePermissionItem {
  submenuIds: number[],
  subIds: number[],
  parentIds: number[],
  subMenus?: ExtendedRolePermissionItem[],
  actions: ExtendedRolePermissionItem[],
}
