// 登录的数据结构
export interface LoginType {
  username: string,
  password: string,
  remember: boolean
}

// 权限的数据结构
export interface PermissionType {
  menu: string,
  children?: PermissionType[]
}

// 用户的数据结构
export interface UserType {
  username?: string
  permission?: PermissionType[]
}
