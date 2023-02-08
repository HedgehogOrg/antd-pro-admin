/*
 * File: AllRole.tsx
 * Project: sd-console-web
 * FilePath: /src/modules/account/components/AllRole.tsx
 * Created Date: 2022-05-12 14:05:27
 * Author: diya
 * -----
 * Last Modified: Fri Nov 04 2022
 * Modified By: diya
 * -----
 * Description:
 */
import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { ResponseType, SelectProps } from './type';

/**
 *
 * @props  defaultValue    默认值
 * @props  value
 * @props  onChange        上传回调变更 如果需要在renderFormItem里面使用需要setFieldsValue
 * @props  tableRef        数据源更新
 * @props  visible         编辑和新建的模态框为可见状态
 * @props  fetch           API请求配置，传入@/apis文件夹中的fetch实例
 * @props  defaultOptions  可以直接传入数据，不通过fetch请求数据
 * @props  placeholder     默认提示文字
 * @props  disabled  是否禁用
 * @returns
 */

export default function SelectInput<T extends ResponseType>(props: SelectProps) {
  const {
    visible, tableRef, onChange, defaultValue, value, showSearch, fetch, placeholder, defaultOptions, disabled, style,
  } = props;
  const [allOptions, setAllOptions] = useState<T[]>([]);
  const [optionId, setOptionId] = useState<number>();

  const { Option } = Select;
  useEffect(() => {
    let isUnmount = false;

    if (defaultOptions) {
      setAllOptions(defaultOptions);
    } else {
      fetch.listAll().then((res: any) => {
        if (!isUnmount) {
          if (Array.isArray(res)) {
            setAllOptions(res);
          }
        }
      });
    }

    return () => { isUnmount = true; }; // 最好return一个isUnmount
  }, [tableRef, visible, defaultOptions]);

  useEffect(() => {
    if (value) {
      setOptionId(value);
    }
  }, [value]);
  // 设置表单值变化的时机
  const triggerChange = (changedValue: number) => {
    if (onChange) {
      onChange(changedValue);
    }
  };

  const onSelectChange = (newValue: number) => {
    triggerChange(newValue);
    setOptionId(newValue);
  };
  return (
    <Select
      defaultValue={defaultValue}
      value={optionId}
      placeholder={placeholder}
      key="itemId"
      allowClear
      onChange={onSelectChange}
      showSearch={showSearch}
      filterOption={(input, option) => (option!.children as unknown as string).includes(input)}
      optionFilterProp="children"
      disabled={disabled}
      style={style}
    >
      {allOptions.map((item) => <Option key={item.id} value={item.id}>{item.name}</Option>)}
    </Select>
  );
}
