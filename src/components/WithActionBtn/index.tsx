/* eslint-disable react/prop-types */
/*
 * File: index.tsx
 * Project: sd-organization-web
 * FilePath: /src/components/WithActionBtn/index.tsx
 * Created Date: 2022-05-18 17:04:21
 * Author: diya
 * -----
 * Last Modified: 2022-05-19 17:15:41
 * Modified By: diya
 * -----
 * Description:
 */

import React, { ReactElement } from 'react';
import { getDisabledAndHidden } from '@/components/AuthButton';
import permissionsStore from '@/stores/permissions';
import permissionCollection from '@/permission';
import ActionBtnMore from './ActionBtnMore';

function WithActionBtn({ children, btnMoreStyle, popupContainer }: { children: ReactElement | ReactElement[], btnMoreStyle?: any, popupContainer?:string }) {
  let result: ReactElement[] = [];
  const hasAuth = (props:any) => {
    const { collection } = permissionCollection;
    const { userButtonPermissions } = permissionsStore;
    const { newHidden } = getDisabledAndHidden(collection, userButtonPermissions, { ...props, hiddenIfDisabled: props?.hiddenIfDisabled || false });
    return newHidden;
  };

  const newChildren:ReactElement[] = [];
  const recursion = (childrens:ReactElement[]) => {
    if (Array.isArray(childrens)) {
      childrens.forEach((child: ReactElement) => {
        if (!child) {
          return false;
        }
        if (Array.isArray(child)) {
          recursion(child);
        } else {
          // 传入封装的组件导致child会包一层，导致取不到props，目前需要在外层透传props
          const newHidden = hasAuth(child.props);
          // const { collection } = permissionCollection;
          // const { userButtonPermissions } = permissionsStore;
          // const { newHidden } = getDisabledAndHidden(collection, userButtonPermissions, child.props);
          if (!newHidden) {
            newChildren.push(child);
          }
        }
      });
    }
  };
  if (Array.isArray(children)) {
    recursion(children);
    if (newChildren.length < 4) {
      result = newChildren;
    } else {
      result = newChildren.slice(0, 2);
      result.push(
        // ActionBtnMore({
        //   btnMoreStyle,
        //   children: newChildren.slice(2),
        // }),
        <ActionBtnMore btnMoreStyle={btnMoreStyle} key="ActionBtnMore" popupContainer={popupContainer}>
          {newChildren.slice(2)}
        </ActionBtnMore>,
      );
    }
  } else {
    result.push(children);
  }
  return (
    <>
      {result.map((item) => item)}
    </>
  );
}
export default WithActionBtn;
