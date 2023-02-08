/**
 * File: type.d.ts
 * Project: sd-console-web
 * FilePath: /src/components/DepartmentTreeSelect/type.d.ts
 * Created Date: 2022-05-13 16:26:25
 * Author: diya
 * -----
 * Last Modified: Fri Nov 04 2022
 * Modified By: diya
 * -----
 * Description:
 */

// 部门树形列表类型定义
export interface TreeSelectResponseType {
  id:number;
  name: string;
  // 上级部门id
  parentId: number;
  children?:TreeSelectResponseType[]
  // 创建时间
  createdAt?: number;
  // 更新时间
  updatedAt?: number;
  status:number;

}
// props类型
export interface TreeSelectPropType {
  value?:MedTagsValue[];
  onChange?: Function;
  visible?: boolean; // 模态框是否可见
  tableRef?: ActionType;
  search?:boolean;
  fetch: any;
  title: string;
  disabled?:boolean;
}

export interface TreeSelectValue {
  id?: number;
  name?: string;
  value?: number;
  label?: string;
}
