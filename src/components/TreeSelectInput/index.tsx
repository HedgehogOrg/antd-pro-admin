/*
 * File: index.tsx
 * Project: sd-console-web
 * FilePath: /src/components/MedTagsTreeSelect/index.tsx
 * Created Date: 2022-05-13 16:23:48
 * Author: diya
 * -----
 * Last Modified: Fri Nov 04 2022
 * Modified By: diya
 * -----
 * Description:
 */
import React, { useEffect, useState } from 'react';
import { TreeSelect } from 'antd';
import { TreeSelectPropType, TreeSelectResponseType, TreeSelectValue } from './type';
/**
 *
 * @props  value
 * @props  onChange 上传回调变更
 * @props  tableRef 数据源更新
 * @props  visible  编辑和新建的模态框为可见状态
 * @props  fetch  API请求配置，传入@/apis文件夹中的fetch实例
 * @props  title  默认提示文字
 * @props  disabled  是否禁用
 * @returns
 */
export default function TreeSelectInput<T extends TreeSelectResponseType>(props: TreeSelectPropType) {
  const {
    visible, tableRef, onChange, value, search, fetch, title, disabled,
  } = props;
  // 部门树形数据
  const [allMedTagsData, setAllMedTagsData] = useState<T[]>([]);
  const [allMedTagsId, setAllMedTagsId] = useState<TreeSelectValue[]>();

  useEffect(() => {
    let isUnmount = false;
    fetch.treeList().then((res: any) => {
      if (!isUnmount) {
        setAllMedTagsData(res);
      }
    });
    return () => { isUnmount = true; };
  }, [tableRef, visible]);
  useEffect(() => {
    if (value) {
      setAllMedTagsId(value);
    }
  }, [value]);
  // 设置表单值变化的时机
  const triggerChange = (changedValue: TreeSelectValue[]) => {
    if (onChange) {
      onChange(changedValue);
    }
  };

  const onDepChange = (newDepartments: TreeSelectValue[]) => {
    triggerChange(newDepartments);
    setAllMedTagsId(newDepartments);
  };
  return (
    <TreeSelect
      value={allMedTagsId}
      allowClear
      treeData={allMedTagsData}
      treeCheckable
      fieldNames={{ label: 'name', value: 'id' }}
      treeDefaultExpandAll
      style={{ width: '100%' }}
      showCheckedStrategy={TreeSelect.SHOW_ALL}
      treeCheckStrictly
      onChange={onDepChange}
      placeholder={title}
      showSearch={search}
      filterTreeNode
      treeNodeFilterProp="name"
      showArrow
      maxTagCount="responsive"
      disabled={disabled}
    />
  );
}
