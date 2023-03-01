/*
 * File: ResetPasswordModal.tsx
 * Project: sd-organization-web
 * FilePath: /src/modules/account/components/ResetPasswordModal.tsx
 * Created Date: 2022-05-19 10:26:33
 * Author: diya
 * -----
 * Last Modified: 2022-05-19 17:07:08
 * Modified By: diya
 * -----
 * Description:
 */
import {
  Button, Form, Input, message, Modal,
} from 'antd';
import React from 'react';
import { AccountMoreType } from '@/types/stores/account/index';
import { useIntl } from '@/utils/intl';
import style from './createModal.module.less';
import AccountStore from '@/stores/account/AccountStore';

export default function ResetPasswordModal(props: AccountMoreType) {
  const t = useIntl('account');
  const { record, closeModal, visible } = props;
  // 提交保存
  const handleResetOk = (accountId: number, values: any) => {
    const { password } = values;
    AccountStore.resetPassword({ id: accountId, password }).then(() => {
      message.info(t('RESET_PASSWORD_SUCCESS'));
      if (closeModal) { closeModal(); }
    }).catch((error) => {
      message.error(error.message);
    });
  };
  const [form] = Form.useForm();

  return (
    <Modal
      centered
      title={t('RESET_PASSWORD')}
      open={visible}
      footer={null}
      destroyOnClose
      onCancel={closeModal}
      maskClosable={false}
    >
      <Form
        form={form}
        onFinish={(values) => handleResetOk(record.id, values)}
        preserve={false}
      >
        <Form.Item
          name="password"
          label={t('RESET_PASSWORD')}
          getValueFromEvent={(event) => event.target.value.replace(/[\u4E00-\u9FA5]|\s+/g, '')}
          rules={[
            { required: true, message: t('RESET_PASSWORD_EMPTY'), whitespace: true },
            { min: 6, message: t('RESET_PASSWORD_FORMAT_IS_INCORRECT') },
          ]}
        >
          <Input
            placeholder={t('ENTER_NEW_PASSWORD')}
            maxLength={16}
          />
        </Form.Item>
        <Form.Item className={style['form-button']}>
          <Button type="primary" htmlType="submit" className={style['save-button']}>
            {t('SAVE')}
          </Button>
          <Button htmlType="button" onClick={closeModal}>
            {t('CANCEL')}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
