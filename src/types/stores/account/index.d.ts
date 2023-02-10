// 账号管理列表，表格数据类型定义
export interface AccountListItem {

  id:number;
  name: string;
  account: string;
  // 角色ID
  roleId: number;
  // 部门ID
  departmentIds: number[];
  /**
   * 账号状态：0 禁用 1 启用
   */
  status: number;
  // 创建时间
  createdAt: number;
  // 更新时间
  updatedAt: number;
  search:boolean;
  // 备注
  remark: string;
  // 头像
  avatar:string;
  // 签名
  signUrl: string;
  role:ItemType;
  departments:ItemType[];
  creator: ItemType
  isSuper:number;
}

// 账号管理请求参数类型
export interface AccountListRequestType {
  id?: number;
  name?: string;
  pageSize: number;
  page: number;
  total?:number;
  sort?:string;
  account?:string;
  search?: string,
  expand?: string,
  attributes?: Array,
  roleId?: number;
  // 部门ID
  departmentIds?: number[] | string;
  departments?:ItemType[];
  status?: number;
}

// 账号管理列表返回数据类型定义
export interface ItemType {
  id:number;
  name: string;
  level?:number;
  parentId?:number;
}

// 新建账号类型定义
export interface CreateAccountRequestType {
  id?:number;
  name: string;
  account:string;
  avatar?:string;
  remark?:string;
  password?:string;
  roleId:number;
  departmentIds?:number[] | string;
  departments?:ItemType[]
  status?:number;
  expand?:string;
  isSuper?:number;
}
// 处理参数转化的类型
export interface CreateAccountTansformType {
  id?:number;
  name: string;
  account:string;
  avatar?:OssImgType[];
  remark?:string;
  password?:string;
  roleId:number;
  departmentIds?:number[number[]];
  departments?:ItemType[]
  status?:number;
  expand?:string,
}

interface OssImgType {
  url?:string
  uid: number | string,
  name: string,
  status: string,
}

// 编辑账号类型定义
export interface EditAccountRequestType extends CreateAccountRequestType {
  status?:number;
}
export interface EditAccountTansformType extends CreateAccountTansformType {}

// 删除账号类型定义
export interface DeleteAccountRequestType {
  id:number;
}

// 所有角色类型定义
export interface AllRolesResponseType {
  id:number;
  name: string;
  value:number;
  label : string;
  description: string;
  status: number;
  // 创建时间
  createdAt: number;
  // 更新时间
  updatedAt: number;

}
// 部门树形列表类型定义
export interface DepartmentsResponseType {
  id:number;
  name: string;
  // 上级部门id
  parentId: number;
  children?:DepartmentsResponseType[]
  // 创建时间
  createdAt?: number;
  // 更新时间
  updatedAt?: number;
}
// 模态框类型
export interface ModalType {
  visible: boolean; // 模态框是否可见
  closeModal: () => void; // 关闭模态框
  tableRef:ActionType;
  editId?:number | undefined;
  isEdit?:boolean;
}
export interface AccountMoreType {
  record:AccountListItem;
  visible?: boolean; // 模态框是否可见
  closeModal?: () => void; // 关闭模态框
  tableRef?:ActionType;
  aclsid?:string;
  disabled?:boolean;
  hiddenIfDisabled?:boolean;
}
export interface ProgressType {
  percent:number
}

// 导入账号类型
export interface ImportAccountType {
  data:ItemType[];
  errData:ImportErr[]
}
export interface ImportErr {
  index:number;
  message:string;
}
