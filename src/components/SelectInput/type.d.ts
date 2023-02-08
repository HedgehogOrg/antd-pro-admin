/**
 * File: type.d.ts
 * Project: sd-console-web
 * FilePath: /src/components/medicationCategorys/type.d.ts
 * Created Date: 2022-05-12 14:56:03
 * Author: diya
 * -----
 * Last Modified: Fri Nov 04 2022
 * Modified By: diya
 * -----
 * Description:
 */

// 药物分类类型定义
export interface ResponseType {
  id:number;
  name: string;
  value:number;
  label : string;

}
export interface SelectProps {
  defaultValue?: number;
  value?: number;
  onChange?: Function;
  visible?: boolean; // 模态框是否可见
  tableRef?: ActionType;
  showSearch?: boolean;
  fetch?: any;
  placeholder: string;
  defaultOptions?: any[];
  disabled?:boolean;
  style?: React.CSSProperties
}
