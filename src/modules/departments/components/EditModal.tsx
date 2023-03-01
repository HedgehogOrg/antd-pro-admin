/*
 * Author: Alvin
 * Modified By: Alvin
 * Created Date: 2022-04-14 17:57:52
 * Last Modified: 2022-04-19 14:47:20
 * Description:
 */
import React from 'react';
import {
  Modal, FormInstance,
} from 'antd';
import { Department, DepartmentParams } from '@/types/stores/departments';
import styles from './index.module.less';
import DepartmentForm from './DepartmentForm';
import { useIntl } from '@/utils/intl';

type Props = {
  form: FormInstance<any>
  item?: Department,
  isModalVisible: boolean,
  eidtType?: EditType,
  onOk?: (item: DepartmentParams, eidtType?: EditType) => void,
  onCancel?: () => void,
};

export type EditType = 'create' | 'update';

export default function EditModal(props: Props) {
  const {
    eidtType, item, isModalVisible, onOk, onCancel, form,
  } = props;
  const [confirmLoading, setConfirmLoading] = React.useState<boolean>(false);
  const i18n = useIntl('department');

  const handleOk = () => {
    if (onOk) {
      form?.validateFields().then((values:any) => {
        const { name, parentId } = values;
        if (name && parentId !== undefined) {
          setConfirmLoading(true);
          setTimeout(() => {
            onOk({ name, parentId }, eidtType);
            setConfirmLoading(false);
          }, 500);
        }
      });
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      form?.resetFields();
      onCancel();
    }
  };

  const modalProps = {
    title: eidtType === 'create' ? i18n('CREATE_DEPARTMENT') : i18n('UPDATE_DEPARTMENT'),
    visible: isModalVisible,
    maskClosable: false,
    onOk: handleOk,
    onCancel: handleCancel,
    confirmLoading,
    wrapClassName: styles.modal,
    destroyOnClose: true,
  };

  return (
    <Modal centered {...modalProps}>
      <DepartmentForm form={form} item={item} />
    </Modal>
  );
}
