import {
  Button, Cascader, Form, Input, InputNumber, message, Modal, Radio, RadioChangeEvent, Switch, TreeSelect,
} from 'antd';
import { useEffect, useState } from 'react';
import { EditPermissionProps, TmpPermissionTree, PermissionItemType } from '@/types/system';
import permissionFetch from '@/apis/PermissionFetch';
// import permissionOrgFetch from '@/apis/PermissionOrgFetch';
import permission from '@/stores/permissions';
import { Method, PermissionType } from '@/enums';
import intl, { useIntl } from '@/utils/intl';
import { trim } from '@/utils/utils';
import { findDeep } from './util';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

// hack：10连击开启上级可编辑(！！！注意：菜单和按钮不可同级)
let parentTimeout: NodeJS.Timeout | null = null;
let parentTimes = 0;
const tryEditParent = (callback: Function) => {
  if (parentTimeout) {
    clearTimeout(parentTimeout);
    parentTimeout = null;
  }
  parentTimeout = setTimeout(() => { parentTimes = 0; parentTimeout = null; }, 1000);
  if (parentTimes === 10) {
    callback();
  }
  parentTimes += 1;
};

// 获取父级长度
const getParentLen = (value: string | number | any[] | undefined) => (Array.isArray(value) ? value.length : 0);

// 获取对应的API
const getAction = (isEdit: boolean, newItem: PermissionItemType) => {
  // if (platform === Platform.CONSOLE) {
  // return isEdit ? permissionFetch.update(newItem.id, newItem) : permissionFetch.create(newItem);
  // } if (platform === Platform.ORGANIZATION) {
  //   return isEdit ? permissionOrgFetch.update(newItem.id, newItem) : permissionOrgFetch.create(newItem);
  // }

  if (isEdit) {
    permissionFetch.update(newItem.id, newItem);
  } else {
    permissionFetch.create(newItem);
  }
  return Promise.resolve();
};

// 可选的请求方法
const methodOptions = [
  Method.GET,
  Method.POST,
  Method.PUT,
  Method.DELETE,
].map((method) => ({ label: method, value: method }));

function EditAcls({
  // platform,
  isModalVisible,
  setIsModalVisible,
  treeData,
  aclsData,
  editItem,
  isEdit,
  onEditOk,
}: EditPermissionProps) {
  const t = useIntl('modules');
  // 表单
  const [form] = Form.useForm();
  // 可选为父级的菜单树
  const menuTree:TmpPermissionTree[] = JSON.parse(JSON.stringify(treeData));
  // 是否提交中
  const [loading, setLoading] = useState(false);
  // 菜单还是按钮：按钮-action必填
  const [type, setType] = useState(PermissionType.MENU);
  // 父级长度
  const [parentLen, setParentLen] = useState(0);
  // 菜单类型是否禁止
  const [menuDisabled, setMenuDisabled] = useState(false);
  // 按钮类型是否禁止
  const [buttonDisabled, setButtonDisabled] = useState(false);
  // hack：10连击开启上级可编辑(！！！注意：菜单和按钮不可同级)
  const [allowEditParent, setAllowEditParent] = useState(false);

  // 设置类型并且设置是否禁选类型
  const setTypeFrom = (newType: PermissionType) => {
    if (newType) {
      form.setFieldsValue({ type: newType });
      setType(newType);
      if (newType === PermissionType.MENU) {
        setMenuDisabled(false);
        setButtonDisabled(true);
      } else if (newType === PermissionType.BUTTON) {
        setMenuDisabled(true);
        setButtonDisabled(false);
      }
    } else {
      setMenuDisabled(false);
      setButtonDisabled(false);
    }
  };

  // 变更上级
  const handleChangeParentId = (value: string | number | any[] | undefined, parents: any[] | undefined) => {
    // 一级菜单(len === 0)必填icon
    // MENU_MAX_LEVEL 级菜单下不能再选菜单
    const len = getParentLen(value);
    setParentLen(len);

    let newType = 0;
    if (!len) {
      // 如果没有父级菜单，就默认选中菜单类型
      newType = PermissionType.MENU;
    } else if (len === permission.MENU_MAX_LEVEL) {
      // 如果已经选了最深级别，就默认选中按钮类型
      newType = PermissionType.BUTTON;
    } else {
      const item = parents![len - 1];
      // 子级已经选择过类型了（不能菜单+按钮同级别）
      if (item.actions && item.actions.length) {
        // 按钮
        newType = item.actions[0].type;
      }
      if (item.children && item.children.length) {
        // 菜单
        newType = item.children[0].type;
      }
    }
    setTypeFrom(newType);
  };

  // 点击确定
  const handleOk = () => {
    // 校验
    form.validateFields().then(async (res) => {
      // 提交前整理数据
      const newItem: PermissionItemType = trim(res);
      const len = getParentLen(res.parentId);
      // 设置层级
      newItem.level = len + 1;
      if (len) {
        // 设置父级id
        newItem.parentId = res.parentId[len - 1];
      }
      // 描述为空也传
      newItem.description = newItem.description || '';
      newItem.aclIds = newItem.aclIds ? newItem.aclIds.map((item: any) => item.value) : undefined;
      newItem.isShow = newItem.isShow ? 1 : 0;

      setLoading(true);
      // 获取对应的操作api
      const action = getAction(isEdit, newItem);
      // 提交
      await action.finally(() => setLoading(false));
      setIsModalVisible(false);
      if (typeof onEditOk === 'function') {
        // callback
        onEditOk();
      }
      message.success(`${intl.ACTION}${intl.SUCCESS}`);
    }).catch((e) => console.warn(e));
  };

  // 点击取消
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // 处理修改类型
  const handleChangeAction = (e: RadioChangeEvent) => {
    setType(e.target.value);
  };

  // 从粘贴版拿权限
  const pastePermission = async () => {
    if (!isEdit) {
      // 需要用户在浏览器点击允许
      const result = await navigator.clipboard.readText();
      try {
        const {
          name, description, action, method, apiPath, isShow, parentId, parents, type: tmpType,
        } = JSON.parse(result);
        setEditItem({
          name, description, action, method, apiPath, isShow, parentId, parents, type: tmpType,
        } as TmpPermissionTree);
        navigator.clipboard.writeText('');
      } catch (error) {
        console.warn('粘贴板没有复制到合规的权限数据');
      }
    }
  };

  // 填充字段
  const setEditItem = (tmpItem: TmpPermissionTree) => {
    setParentLen(tmpItem.level - 1);
    setTypeFrom(tmpItem.type);
    const parentId = tmpItem.parents ? tmpItem.parents.map((item: TmpPermissionTree) => item.id) : 0;
    const aclsValue = tmpItem.aclIds ? tmpItem.aclIds.map((id: number) => {
      const acl = findDeep(aclsData, id);
      return { label: acl?.name, value: acl?.id };
    }) : undefined;
    form.setFieldsValue({
      ...tmpItem, parentId, aclIds: aclsValue, isShow: tmpItem.isShow === 1,
    });
  };

  useEffect(() => {
    if (isModalVisible) {
      // 显示
      if (isEdit) {
        // 编辑
        setEditItem(editItem);
        // 一般不允许编辑上级(！！！注意：菜单和按钮不可同级)
        setAllowEditParent(false);
        // 设置关联api
      } else {
        // 新建
        // 重置可选类型
        handleChangeParentId(undefined, undefined);
      }
    }
  }, [isModalVisible]);

  return (
    <>
      {}
      <Modal
        centered
        title={<span onDoubleClick={pastePermission}>{`${isEdit ? intl.EDIT : t('ADD')}${t('PERMISSION')}`}</span>}
        visible={isModalVisible}
        destroyOnClose
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            {intl.CANCEL}
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            {intl.CONFIRM}
          </Button>,
        ]}
      >
        <Form {...layout} form={form} preserve={false}>
          <Form.Item name="id" hidden>
            {/* 编辑提交需要带id */}
            <Input />
          </Form.Item>
          <Form.Item
            name="parentId"
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
            label={<span onClick={() => tryEditParent(() => setAllowEditParent(true))}>{t('PARENTS')}</span>}
          >
            <Cascader
              options={menuTree}
              fieldNames={{ label: 'name', value: 'id', children: 'children' }}
              expandTrigger="hover"
              changeOnSelect
              onChange={handleChangeParentId}
              disabled={isEdit && !allowEditParent}
            />
          </Form.Item>
          <Form.Item name="type" label={t('TYPE')} initialValue={type}>
            <Radio.Group onChange={handleChangeAction} disabled={isEdit && !allowEditParent}>
              {/* 层级最深的菜单不能再建菜单 */}
              <Radio.Button value={PermissionType.MENU} disabled={menuDisabled}>{intl.MENU}</Radio.Button>
              {/* 有菜单才能有按钮 */}
              <Radio.Button value={PermissionType.BUTTON} disabled={buttonDisabled}>{t('BUTTON')}</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="name" label={t('NAME')} rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label={t('PERMISSION_DESCRIPTION')}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="action" label={t('PERMISSION_ACTION')} rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          {
            // 菜单类型
            type === PermissionType.MENU && (
              <>
                <Form.Item name="path" label={t('PERMISSION_PATH')}>
                  <Input />
                </Form.Item>
                {
                  !parentLen && (
                    // 一级菜单才需要图标
                    <Form.Item name="icon" label={t('PERMISSION_ICON')} rules={[{ required: true }]}>
                      <Input />
                    </Form.Item>
                  )
                }
              </>
            )
          }
          {
            // 按钮类型
            type === PermissionType.BUTTON && (
              <>
                <Form.Item name="method" label={t('PERMISSION_METHOD')} rules={[{ required: true, message: `${t('PLEASE_SELECT')}\${label}` }]}>
                  <Radio.Group optionType="button" options={methodOptions} />
                </Form.Item>
                <Form.Item name="apiPath" label={t('PERMISSION_API_PATH')} rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="aclIds" label={t('PERMISSION_ACLIDS')}>
                  <TreeSelect
                    treeData={aclsData}
                    fieldNames={{ label: 'name', value: 'id' }}
                    allowClear
                    filterTreeNode
                    treeNodeFilterProp="name"
                    treeCheckable
                    treeCheckStrictly
                    treeDefaultExpandAll
                    showCheckedStrategy={TreeSelect.SHOW_ALL}
                  />
                </Form.Item>
                <Form.Item
                  name="isShow"
                  label={t('PERMISSION_STATUS')}
                  valuePropName="checked"
                  initialValue={isEdit ? editItem.isShow === 1 : true}
                >
                  <Switch
                    checkedChildren={t('PERMISSION_SHOW')}
                    unCheckedChildren={t('PERMISSION_HIDE')}
                    defaultChecked
                  />
                </Form.Item>
              </>
            )
          }
          <Form.Item name="sort" label={t('PERMISSION_SORT')}>
            <InputNumber min={0} precision={0} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default EditAcls;
