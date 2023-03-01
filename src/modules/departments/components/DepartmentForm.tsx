import React, { useState, useEffect } from 'react';
import {
  Form, TreeSelect, FormInstance, Input, message,
} from 'antd';
import { useIntl } from '@/utils/intl';
import { Department } from '@/types/stores/departments';
import DepartmentFetch from '@/apis/DepartmentsFetch';
import { validateLength } from '@/utils/validate';

type Props = {
  form: FormInstance<any>
  item?: Department,
};

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

export default function DepartmentForm(props: Props) {
  const { form, item } = props;
  const FormItem = Form.Item;
  const { TreeNode } = TreeSelect;
  const i18n = useIntl('department');

  const [departmentList, setDepartmentList] = useState<Department[]>([]);

  useEffect(() => {
    DepartmentFetch.treeList().then((ressult) => {
      setDepartmentList(() => ressult);
    }).catch((error) => {
      message.info(error.message);
    });
  }, []);

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: '${label}不可为空',
  };
  /* eslint-enable no-template-curly-in-string */

  function nodeList(departments: Department[], parentId ?:number) {
    if (departments && departments.length) {
      const result: (JSX.Element | null)[] = departments.map((department) => {
        const { children, id } = department;
        if (children && children.length && (item?.id === id || parentId)) {
          return (
            <TreeNode title={department.name} value={department.id} key={department.id} disabled>
              {nodeList(children, id)}
            </TreeNode>
          );
        } if (children && children.length) {
          return (
            <TreeNode title={department.name} value={department.id} key={department.id}>
              {nodeList(children)}
            </TreeNode>
          );
        }
        if (department && (item?.id === id || parentId)) {
          return (
            <TreeNode title={department.name} value={department.id} key={department.id} disabled />
          );
        }
        if (department) {
          return (
            <TreeNode title={department.name} value={department.id} key={department.id} />
          );
        }
        return null;
      });
      return result;
    }
    return null;
  }

  return (
    <Form
      form={form}
      preserve={false}
      {...layout}
      validateMessages={validateMessages}
    >
      <FormItem
        label={i18n('DEPARTMENT_NAME')}
        name="name"
        initialValue={item?.name}
        rules={[
          { required: true },
          validateLength(form, 'name', '部门名称', 0, 20, 1),
        ]}
      >
        <Input
          placeholder={i18n('DEPARTMENT_NAME_PALCEHOLDER')}
        />
      </FormItem>
      <FormItem
        label={i18n('PARENT_DEPARTMENT')}
        name="parentId"
        initialValue={item?.id}
        rules={[
          { required: true },
        ]}
      >
        <TreeSelect
          allowClear
          placeholder={i18n('DEPARTMENT_SEARCH_PLACEHOLDER')}
        >
          <TreeNode title="无" value={0} key="0" />
          {nodeList(departmentList)}
        </TreeSelect>
      </FormItem>
    </Form>
  );
}
