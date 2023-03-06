import { Button } from 'antd';
import { BaseButtonProps } from 'antd/lib/button/button';
import {
  MouseEventHandler, AnchorHTMLAttributes, ButtonHTMLAttributes, RefAttributes,
} from 'react';
// import { permissionsStore, permissionCollection } from 'Remote/Router';
import permissionsStore from '@/stores/permissions';
import permissionCollection from '@/permission';

/**
 * 根据权限值返回权限id
 * @param collection 权限对照表
 * @param arr 权限值
 * @returns 权限id
 */
function getOriginIdFromPath(collection: { [key: string]: any }, arr: string[]) {
  let tmpCollection = collection;
  while (arr.length) {
    const key = arr.splice(0, 1)[0];
    tmpCollection = tmpCollection[key];
    if (!tmpCollection || typeof tmpCollection === 'string') {
      return tmpCollection;
    }
  }
  return tmpCollection;
}

/**
 * 计算 disabled 和 hidden 的值
 * @param collection 权限对照表
 * @param userButtonPermissions 用户按钮权限
 * @param props 按钮属性
 * @returns 按钮对应的 disabled 和 hidden 的值
 */
export function getDisabledAndHidden(collection: { [key: string]: any }, userButtonPermissions: { [key: string]: any; }[], props: PropsType) {
  const {
    hiddenIfDisabled = false, aclsid, disabled, hidden,
  } = props;
  const paths = String(aclsid).split('.');
  const originId = getOriginIdFromPath(collection, paths);
  const newDisabled = !userButtonPermissions.includes(originId) || disabled;
  const newHidden = hidden || (newDisabled && hiddenIfDisabled);
  return {
    newDisabled,
    newHidden,
  };
}

type PropsType = JSX.IntrinsicAttributes & Partial<{ aclsid: string; hiddenIfDisabled?: boolean; href: string; target?: string | undefined; onClick?: MouseEventHandler<HTMLElement> | undefined;loading?: boolean } & BaseButtonProps & Omit<AnchorHTMLAttributes<any>, 'type' | 'onClick'> & { htmlType?: 'button' | 'submit' | 'reset' | undefined; onClick?: MouseEventHandler<HTMLElement> | undefined; } & Omit<ButtonHTMLAttributes<any>, 'type' | 'onClick'>> & RefAttributes<HTMLElement>;
function AuthButton(props: PropsType) {
  // 原生的button不支持驼峰命名，只支持纯小写
  const { hiddenIfDisabled, ...restProps } = props;
  const { children } = restProps;

  const { collection } = permissionCollection;
  const { userButtonPermissions } = permissionsStore;
  const { newDisabled, newHidden } = getDisabledAndHidden(collection, userButtonPermissions, props);
  return <Button {...restProps} disabled={newDisabled} hidden={newHidden}>{children}</Button>;
}
export default AuthButton;
