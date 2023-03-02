import {
  GetOrganizationRequestType,
  OrganizationItem,
  RoleItem,
  ExtendedRolePermissionItem,
} from '@/types/stores/role';
import request from '@/utils/request';
import { LimitedResourceFetch } from './fetch';

class RoleFetch extends LimitedResourceFetch<RoleItem> {
  constructor() {
    super('roles');
  }

  async isRoleExist(data: { id?: number, name?: string, type?: number }) {
    return request({
      url: '/isExist/roles',
      method: 'get',
      data,
    });
  }

  async getAllOrganizations(data: GetOrganizationRequestType) {
    return request<OrganizationItem[]>({
      url: '/listAll/organizations',
      method: 'get',
      data,
    });
  }

  async getPermissions() {
    return request<ExtendedRolePermissionItem[]>({
      url: '/treeList/acls',
      method: 'get',
    });
  }
}

export default new RoleFetch();
