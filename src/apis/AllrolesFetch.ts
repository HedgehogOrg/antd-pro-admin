import { AllRolesResponseType } from '@/types/stores/account';
import { LimitedResourceFetch } from './fetch';

// 所有角色列表

class AllrolesFetch extends LimitedResourceFetch<AllRolesResponseType> {
  constructor() {
    super('roles');
  }
}
export default new AllrolesFetch();
