// 登录的数据结构
export interface LoginType {
  account?: string,
  regNo?:string,
  password: string,
  remember?: boolean
}

// 权限的数据结构
export interface PermissionType {
  menu: string,
  children?: PermissionType[]
}

// 用户的数据结构
export interface UserType {
  id: number,
  organizationId: number,
  account: string,
  avatar: string,
  createdAt: number,
  creatorId: number,
  deletedAt: number | null,
  mobile: string,
  name: string,
  isSuper: boolean,
  organizationId: number,
  organization: {
    id: number,
    name: string,
    systemLogo: string,
    systemName: string,
  },
  remark: string | null,
  roleId: number,
  role:Role,
  status: number,
  title: string,
  token: string,
  updatedAt: number,
}

export type PasswordMutateType = {
  id?: number,
  oldPassword: string,
  newPassword: string,
  confirmPassword: string
};

type Role = {
  id:number,
  name:string,
  scopeType:number, //  数据范围类型, 0: 全部, 1: 本科室及下属科室, 2: 本科室, 3: 本人
};
