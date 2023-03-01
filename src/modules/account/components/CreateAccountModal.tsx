/*
 * File: AccountList.jsx
 * Project: sd-console-web
 * FilePath: /src/modules/account/components/AccountList.jsx
 * Created Date: 2022-04-11 14:27:13
 * Author: diya
 * Description:
 */
import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  Modal,
  Switch,
  Button,
  message,
} from 'antd';
import {
  ExclamationCircleOutlined, PlusOutlined,
} from '@ant-design/icons';
import AccountStore from '@/stores/account/AccountStore';
import {
  ModalType,
  CreateAccountTansformType,
} from '@/types/stores/account/index';
import style from './createModal.module.less';
import { useIntl } from '@/utils/intl';
import UploadInput from '@/components/UploadInput';
import SelectInput from '@/components/SelectInput';
import AllrolesFetch from '@/apis/AllrolesFetch';
import TreeSelectInput from '@/components/TreeSelectInput';
import DepartmentTreeFetch from '@/apis/DepartmentTreeFetch';

export default function CreateAccountModal(props: ModalType) {
  const t = useIntl('account');
  const [switchStatus, setswitchStatus] = useState(1);
  const { visible, closeModal, tableRef } = props;
  // 修改过表单才需要做取消提醒
  const [showCancelWarning, setShowCancelWarning] = useState(false);

  const [form] = Form.useForm();

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
  };
  // 登录账号检查
  // 限制空格汉字输入
  const getValidateValue = (event: any) => {
    let { value } = event.target;
    value = value.replace(/[\u4E00-\u9FA5]|\s+/g, '');
    return value;
  };
  // 不能输入汉字空格规则
  const checkAccount = async (rules: any, value: any) => {
    if (value) {
      if (!/[\u4E00-\u9FA5]/g.test(value)) {
        return Promise.resolve();
      }
    }
    return Promise.reject(new Error(t('CHINESE_AND_SPACES_CANNOT_BE_ENTERED')));
  };
  /**
    * 表单校验规则
    */
  const rules = {
    name: [
      { required: true, message: t('NAME_CANNOT_BE_EMPTY'), whitespace: true },
    ],
    account: [
      { required: true, message: t('LOGIN_ACCOUNT_CANNOT_BE_EMPTY') },
      { validator: checkAccount },
    ],
    password: [
      { required: true, message: t('LOGIN_PASSWORD_CANNOT_BE_EMPTY'), whitespace: true },
      { min: 6, message: t('THE_LOGIN_PASSWORD_FORMAT_IS_INCORRECT') },
      { validator: checkAccount },
    ],
    role: [
      { required: true, message: t('ROLE_CANNOT_BE_EMPTY') },
    ],
    departments: [
      { required: true, message: t('DEPARTMENT_CANNOT_BE_EMPTY') },
    ],
  };

  const handleSwitch = (checked: boolean | number) => {
    setswitchStatus(+checked);
  };
  const finnishCreate = (values: CreateAccountTansformType) => {
    const {
      name, account, password, remark, roleId, departmentIds, avatar, status,
    } = values;
    const departments = (departmentIds === undefined || departmentIds.length === 0) ? undefined : departmentIds.map((item: any) => item.value);
    const avatarUrl = avatar === undefined ? undefined : avatar[0].url;
    const data = {
      name, account, password, remark, roleId, departmentIds: departments, avatar: avatarUrl, status,
    };
    return new Promise((resolve, reject) => {
      AccountStore.create(data)
        .then((res) => {
          message.success(t('ADD_SUCCESS'));
          tableRef.current?.reload();
          closeModal();
          resolve(res);
        })
        .catch((err) => {
          if (err.statusCode === 409) {
            message.error(t('DUPLICATE_LOGIN_ACCOUNT'));
          } else {
            message.error(t('ADD_FAILURE'));
          }
          reject(err);
        });
    });
  };
  useEffect(() => {
    if (visible) {
      // 重置取消提醒
      setShowCancelWarning(false);
    }
  }, [visible]);
  const { confirm } = Modal;
  const handleCancel = () => {
    if (showCancelWarning) {
      confirm({
        title: t('CANCEL_CREATE_ACCOUNT'),
        icon: <ExclamationCircleOutlined />,
        content: t('CANCEL_THE_EDIT_SCHEDULE'),
        onOk() {
          closeModal();
        },
      });
    } else {
      closeModal();
    }
  };

  return (
    <Modal
      centered
      title={t('CREATE_ACCOUNT')}
      open={visible}
      onCancel={handleCancel}
      footer={null}
      destroyOnClose
      maskClosable={false}
    >
      <Form
        layout="horizontal"
        {...formItemLayout}
        colon={false}
        form={form}
        preserve={false}
        onFinish={(values) => finnishCreate(values)}
        onValuesChange={() => { setShowCancelWarning(true); }}
      >
        <Form.Item
          name="name"
          label={t('NAME')}
          rules={rules.name}
        >
          <Input
            placeholder={t('PLEASE_ENTER_NAME')}
            maxLength={20}
          />
        </Form.Item>
        <Form.Item
          name="account"
          label={t('LOGIN_ACCOUNT')}
          rules={rules.account}
          getValueFromEvent={getValidateValue}
        >
          <Input
            placeholder={t('PLEASE_ENTER_LOGIN_ACCOUNT_MOBILE_PHONE_NUMBER')}
            maxLength={16}
          />
        </Form.Item>
        <Form.Item
          name="password"
          label={t('LOGIN_PASSWORD')}
          rules={rules.password}
          getValueFromEvent={getValidateValue}
        >
          <Input
            placeholder={t('PLEASE_ENTER_LOGIN_PASSWORD')}
            maxLength={16}
          />
        </Form.Item>
        <Form.Item
          name="roleId"
          label={t('ROLE')}
          rules={rules.role}
        >
          <SelectInput
            fetch={AllrolesFetch}
            tableRef={tableRef}
            visible={visible}
            placeholder={t('PLEASE_SELECT_ROLE')}
          />
        </Form.Item>
        <Form.Item
          name="departmentIds"
          label={t('DEPARTMENT')}
          rules={rules.departments}
        >
          <TreeSelectInput
            fetch={DepartmentTreeFetch}
            title={t('PLEASE_SELECT_DEPARTMENT')}
            tableRef={tableRef}
            visible={visible}
          />
        </Form.Item>
        <Form.Item
          name="remark"
          label={t('REMARK')}
        >
          <Input.TextArea showCount maxLength={50} placeholder={t('PLEASE_ENTER_REMARK')} />
        </Form.Item>
        <Form.Item
          name="avatar"
          label={t('AVATAR')}
          hasFeedback
          extra={(
            <div className={style['avatar-text']}>
              <div>{t('SELECT_IMAGE_UPLOAD')}</div>
              <div>{t('SUPPORT_JPG_PNG_JPEG')}</div>
            </div>
          )}
        >
          <UploadInput
            fileType="img"
            ossActionType="ACCOUNT_IMAGE"
            isCustomRequest
            fileSize={5}
            accept=".png,.ipg,.jpeg"
          >
            <div>
              <PlusOutlined />
              <div>{t('IMAGE_UPLOAD')}</div>
            </div>
          </UploadInput>
        </Form.Item>
        <Form.Item
          name="status"
          label={t('ACCOUNT_STATUS')}
          valuePropName="checked"
          initialValue={switchStatus}
          getValueFromEvent={((e) => +e)}
        >
          <Switch
            defaultChecked
            onChange={handleSwitch}
            checkedChildren={t('ENABLE')}
            unCheckedChildren={t('DISENABLE')}
          />
        </Form.Item>
        <Form.Item className={style['form-button']}>
          <Button type="primary" htmlType="submit" className={style['save-button']}>
            {t('SAVE')}
          </Button>
          <Button htmlType="button" onClick={handleCancel}>
            {t('CANCEL')}
          </Button>
        </Form.Item>
      </Form>
    </Modal>

  );
}
