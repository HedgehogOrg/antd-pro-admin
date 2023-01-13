import { message } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import confirm from 'antd/lib/modal/confirm';
import { DeletePermissionProps } from '@/types/system/index.d';
import permission from '@/apis/PermissionFetch';
import permissionOrg from '@/apis/PermissionOrgFetch';
import intl, { useIntl } from '@/utils/intl';
import { PermissionType, Platform } from '@/enums';
import AuthButton from '@/components/AuthButton';
import { ResourceId } from '@/types/common';

function DeletePermission({
  platform,
  deleteItem,
  onDeleteOk,
  onAfterClick,
}: DeletePermissionProps) {
  const t = useIntl('modules');
  const {
    name, parents, type, id,
  } = deleteItem;
  const typeText = type === PermissionType.MENU ? intl.MENU : t('BUTTON');
  let allName = name;
  if (Array.isArray(parents)) {
    allName = parents.reduceRight((memo, item) => `${item.name} - ${memo}`, allName);
  }
  const deleteRow = () => {
    if (onAfterClick) {
      onAfterClick();
    }
    confirm({
      title: `${intl.DELETE}${typeText}`,
      icon: <ExclamationCircleFilled style={{ color: '#faad14' }} />,
      content: (
        <div>
          {t('TIPS_BEFORE_DELETE')}
          {typeText}
          ：
          <span style={{ color: 'red' }}>
            {allName}
          </span>
          &nbsp;？
        </div>
      ),
      okText: intl.CONFIRM,
      cancelText: intl.CANCEL,
      onOk() {
        if (platform === Platform.CONSOLE) {
          permission.destroy(id as ResourceId).then(() => {
            message.success(`${intl.DELETE}${intl.SUCCESS}`);
            if (onDeleteOk) {
              onDeleteOk();
            }
          });
        } else {
          permissionOrg.destroy(id as ResourceId).then(() => {
            message.success(`${intl.DELETE}${intl.SUCCESS}`);
            if (onDeleteOk) {
              onDeleteOk();
            }
          });
        }
      },
    });
  };
  return <AuthButton aclsid={platform === Platform.CONSOLE ? 'modules.DELETE_CONSOLE' : 'modules.DELETE_ORGANIZATION'} type="link" onClick={deleteRow} key="delete">{intl.DELETE}</AuthButton>;
}

export default DeletePermission;
