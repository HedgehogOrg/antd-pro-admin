/*
 * File: DeleteAccount.txs
 * Project: sd-organization-web
 * FilePath: /src/modules/account/components/DeleteAccount.txs
 * Created Date: 2022-05-19 10:07:30
 * Author: diya
 * -----
 * Last Modified: 2022-05-30 16:57:26
 * Modified By: diya
 * -----
 * Description:
 */
import React from 'react';
import { message, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { AccountListItem, AccountMoreType } from '@/types/stores/account/index';
import AccountStore from '@/stores/account/AccountStore';
import { useIntl } from '@/utils/intl';
import style from './createModal.module.less';
import AuthButton from '@/components/AuthButton';

export default function DeleteAccount(props: AccountMoreType) {
  const t = useIntl('account');
  const { confirm } = Modal;
  const {
    record, tableRef, aclsid, disabled, hiddenIfDisabled,
  } = props;

  // 删除账号
  function ContentComponent(accountRecord: AccountListItem) {
    const { account } = accountRecord;
    return (
      <p>
        {t('DELETE_MODAL_MESSAGE')}
        <strong className={style['account-name-red']}>{account}</strong>
        ?
      </p>
    );
  }
  const handleDeleteClick = (accountRecord: AccountListItem) => {
    confirm({
      title: t('DELETE_ACCOUNT'),
      icon: <ExclamationCircleOutlined />,
      content: ContentComponent(accountRecord),
      onOk() {
        return new Promise((resolve, reject) => {
          AccountStore.delete({ id: accountRecord.id })
            .then((res) => {
              message.success(t('DELETE_SUCCESS_MESSAGE'));
              tableRef.current?.reload();
              resolve(res);
            })
            .catch((err) => {
              reject(err);
            });
        });
      },
    });
  };
  return (
    <AuthButton
      aclsid={aclsid}
      disabled={disabled}
      hiddenIfDisabled={hiddenIfDisabled}
      type="link"
      rel="noopener noreferrer"
      onClick={() => handleDeleteClick(record)}
      style={{ padding: 3 }}
    >
      {t('DELETE')}
    </AuthButton>
  );
}
