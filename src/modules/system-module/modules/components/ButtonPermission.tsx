import {
  Button, Card, Descriptions, message, Popover,
} from 'antd';
import {
  CSSProperties, useEffect, useRef, useState,
} from 'react';
import { TmpPermissionTree, ButtonPermissionProps } from '@/types/system';
import DeletePermission from './DeletePermission';
import intl, { useIntl } from '@/utils/intl';
import AuthButton from '@/components/AuthButton';
import { Platform } from '@/enums';
import { findDeep } from './util';

const labelStyle:CSSProperties = {
  whiteSpace: 'nowrap',
};

function ButtonPermission({
  permission, editRow, onDeleteOk, platform, aclsData,
}: ButtonPermissionProps) {
  const t = useIntl('modules');
  const {
    name, description, action, method, apiPath, sort, aclIds, isShow,
  } = permission;
  // 关联api
  const [depAcls, setDepAcls] = useState<TmpPermissionTree[]>();

  // 详情的弹框
  const popover = useRef<any>(null);
  const editPermission = () => {
    popover.current.close();
    editRow(permission);
  };
  const deletePermission = () => {
    popover.current.close();
  };

  // 复制权限到粘贴版
  const copyPermission = () => {
    const tmpInput = document.createElement('input');
    document.body.appendChild(tmpInput);
    tmpInput.value = JSON.stringify(permission);
    tmpInput.select();
    document.execCommand('copy');
    tmpInput.remove();
    message.success('复制成功');
  };

  useEffect(() => {
    const depAclIds = aclIds ? [...aclIds] : [];

    const deps = depAclIds.map((id) => {
      const acl = findDeep(aclsData, id);

      return acl;
    });

    setDepAcls(deps);
  }, [aclIds, aclsData]);

  const content = (
    <Card
      bordered={false}
      size="small"
      style={{ minWidth: 400 }}
      actions={[
        <AuthButton aclsid={platform === Platform.CONSOLE ? 'modules.EDIT_CONSOLE' : 'modules.EDIT_ORGANIZATION'} type="link" key="edit" onClick={editPermission}>{intl.EDIT}</AuthButton>,
        <DeletePermission deleteItem={permission} onAfterClick={deletePermission} onDeleteOk={onDeleteOk} key="delete" platform={platform} />,
      ]}
    >
      <Descriptions title={name} column={1} bordered size="small">
        <Descriptions.Item label={t('PERMISSION_DESCRIPTION')} labelStyle={labelStyle}>{description}</Descriptions.Item>
        <Descriptions.Item label={t('PERMISSION_ACTION')} labelStyle={labelStyle}>{action}</Descriptions.Item>
        <Descriptions.Item label={t('PERMISSION_METHOD')} labelStyle={labelStyle}>{method}</Descriptions.Item>
        <Descriptions.Item label={t('PERMISSION_API_PATH')} labelStyle={labelStyle}>{apiPath}</Descriptions.Item>
        <Descriptions.Item label={t('PERMISSION_ACLIDS')} labelStyle={labelStyle}>
          { depAcls?.map((item) => (
            <div key={item.id}>
              <strong>{`${item.name}`}</strong>
              <span>{`【${item.action}】：`}</span>
              <span>{item.apiPath}</span>
            </div>
          ))}
        </Descriptions.Item>
        <Descriptions.Item label={t('PERMISSION_SORT')} labelStyle={labelStyle}>{sort}</Descriptions.Item>
        <Descriptions.Item label={t('STATUS')} labelStyle={labelStyle}>{isShow ? '显示' : '隐藏'}</Descriptions.Item>
      </Descriptions>
    </Card>
  );

  return (
    <Popover ref={popover} content={content} trigger="hover">
      <Button size="small" type={isShow ? 'primary' : 'default'} onDoubleClick={copyPermission}>{name}</Button>
    </Popover>
  );
}

export default ButtonPermission;
