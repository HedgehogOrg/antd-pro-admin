/*
 * Author: Alvin
 * Modified By: Alvin
 * Created Date: 2022-04-18 10:38:58
 * Last Modified: 2022-04-18 14:06:17
 * Description:
 */
import React from 'react';
import {
  Modal,
} from 'antd';
import { Department } from '@/types/stores/departments';
import { useIntl } from '@/utils/intl';
import styles from './index.module.less';

type Props = {
  item?: Department,
  isModalVisible: boolean,
  onOk: (item: Department) => void,
  onCancel?: () => void
};

export default function EditModal(props: Props) {
  const {
    item, isModalVisible, onOk, onCancel,
  } = props;
  const [confirmLoading, setConfirmLoading] = React.useState<boolean>(false);
  const i18n = useIntl('department');

  const handleOk = () => {
    if (onOk) {
      if (item) {
        setConfirmLoading(true);
        setTimeout(() => {
          onOk(item);
          setConfirmLoading(false);
        }, 500);
      }
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  const modalProps = {
    title: i18n('DELETED_DEPARTMENT'),
    open: isModalVisible,
    maskClosable: false,
    confirmLoading,
    onOk: handleOk,
    onCancel: handleCancel,
    wrapClassName: styles.modal,
  };

  return (
    <Modal centered {...modalProps}>
      <span>
        {i18n('DELETE_DEPARTMENT_TIPS')}
        :
        {' '}
        <span className={styles['remove-item']}>{item?.name}</span>
      </span>
    </Modal>
  );
}
