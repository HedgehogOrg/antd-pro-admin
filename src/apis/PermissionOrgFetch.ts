import { PermissionTree } from '@/types/system';
import { LimitedResourceFetch } from './fetch';

class PermissionOrgFetch extends LimitedResourceFetch<PermissionTree> {
  constructor() {
    super('organizationAcls');
  }
}

export default new PermissionOrgFetch();
