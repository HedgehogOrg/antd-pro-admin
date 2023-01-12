import {
  Form, Input, message, Modal,
} from 'antd';
import { useIntl } from '@/utils/intl';
import styles from './index.module.less';

type Props = {
  loading?: boolean,
  isModalVisible: boolean,
  onOk?: (values: any) => void,
  onCancel?: () => void
};

const FormItem = Form.Item;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

export default function PasswordChangeModal(props: Props) {
  const {
    loading, isModalVisible, onOk, onCancel,
  } = props;
  const [form] = Form.useForm();
  const t = useIntl('login');

  const handleOk = async () => {
    if (onOk) {
      const data = await form.validateFields();
      if (!data.errorFields) {
        const { oldPassword, newPassword, confirmPassword } = data;
        if (newPassword !== confirmPassword) {
          message.warn(t('PASSWORD_NOT_IDENTICAL'));
        } else {
          onOk({ oldPassword, newPassword, confirmPassword });
        }
      }
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  const getValidateValue = (event: any) => {
    let { value } = event.target;
    value = value.replace(/\s+/g, '').replace(/[\u4E00-\u9FA5]/g, '');
    if (value.length >= 16) {
      value = value.slice(0, 16);
    }
    return value;
  };

  const modalProps = {
    title: t('CHANGE_PASSWORD'),
    visible: isModalVisible,
    maskClosable: false,
    onOk: handleOk,
    onCancel: handleCancel,
    wrapClassName: styles.modal,
    confirmLoading: loading,
  };

  return (
    <Modal centered {...modalProps} destroyOnClose>
      <Form form={form} {...layout} preserve={false}>
        <FormItem
          label={t('OLD_PASSWORD')}
          name="oldPassword"
          getValueFromEvent={getValidateValue}
          rules={[
            { required: true, message: t('RULE_PWD') },
            {
              pattern: /^[^\s]*$/,
              message: t('LOGIN_INPTU_SPACE_WARNINGS'),
            },
            { min: 6, max: 16, message: t('LOGIN_INPTU_PASSWORD_LENGTH_WARNINGS') },
          ]}
          hasFeedback
        >
          <Input
            type="password"
            placeholder={t('OLD_PASSWORD_PLACEHOLDER')}
          />
        </FormItem>
        <FormItem
          label={t('NEW_PASSWORD')}
          name="newPassword"
          getValueFromEvent={getValidateValue}
          rules={[
            { required: true, message: t('RULE_PWD') },
            {
              pattern: /^[^\s]*$/,
              message: t('LOGIN_INPTU_SPACE_WARNINGS'),
            },
            { min: 6, max: 16, message: t('LOGIN_INPTU_PASSWORD_LENGTH_WARNINGS') },
          ]}
          hasFeedback
        >
          <Input type="password" placeholder={t('NEW_PASSWORD_PLACEHOLDER')} />
        </FormItem>
        <FormItem
          label={t('CONFIRM_NEW_PASSWROD')}
          name="confirmPassword"
          getValueFromEvent={getValidateValue}
          dependencies={['newPassword']}
          rules={[
            { required: true, message: t('RULE_PWD') },
            {
              pattern: /^[^\s]*$/,
              message: t('LOGIN_INPTU_SPACE_WARNINGS'),
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error(t('PASSWORD_NOT_IDENTICAL')));
              },
            }),
            { min: 6, max: 16, message: t('LOGIN_INPTU_PASSWORD_LENGTH_WARNINGS') },
          ]}
          hasFeedback
        >
          <Input type="password" placeholder={t('CONFIRM_PLACEHOLDER')} />
        </FormItem>
      </Form>
    </Modal>
  );
}
