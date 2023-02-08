/*
 * File: ResetButton.tsx
 * Project: sd-organization-web
 * FilePath: /src/modules/account/components/ResetButton.tsx
 * Created Date: 2022-05-19 09:56:02
 * Author: diya
 * -----
 * Last Modified: 2022-05-25 11:19:18
 * Modified By: diya
 * -----
 * Description:
 */
import React, { useState } from 'react';
import { AccountMoreType } from '@/types/stores/account/index';
import AuthButton from '@/components/AuthButton';
import { useIntl } from '@/utils/intl';
import ResetPasswordModal from './ResetPasswordModal';

export default function ResetButton(props: AccountMoreType) {
  const {
    record,
  } = props;
  const t = useIntl('account');
  const [resetModalVisible, setResetModalVisible] = useState(false);
  // 控制重置密码模态框
  const resetModal = (show: boolean = false) => {
    setResetModalVisible(show);
  };
  return (
    <>
      <AuthButton
        {...props}
        type="link"
        rel="noopener noreferrer"
        onClick={() => resetModal(true)}
        style={{ padding: 3 }}
      >
        {t('RESET_PASSWORD')}
      </AuthButton>
      <ResetPasswordModal
        record={record}
        visible={resetModalVisible}
        closeModal={() => resetModal(false)}
      />
    </>

  );
}
