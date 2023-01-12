/*
 * Author: Alvin
 * Modified By: Alvin
 * Created Date: 2022-04-07 14:30:08
 * Last Modified: 2022-04-19 11:06:57
 * Description:
 */
import {
  Form, Input, Button,
} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { UserOutlined } from '@ant-design/icons';
import { encodeBase64 } from '@/utils/utils';
import { useIntl } from '@/utils/intl';
import { LoginInfo, LoginInterface, LoginType } from './LoginView.data';
import styles from '../pages/login.module.less';
import { validateContentFormat } from '@/utils/validate';

LoginView.defaultProps = {
  className: undefined,
};

export default function LoginView(props: LoginInterface) {
  const i18n = useIntl('login');
  const { loading } = props;
  const [form] = useForm();

  const onFinish = (values: LoginInfo) => {
    const { account, password = '' } = values;
    const { onLogin } = props;
    if (onLogin) {
      const basePassword = encodeBase64(password);
      onLogin({ account, password: basePassword, kind: LoginType.PASSWORD });
    }
  };

  const getValidateValue = (event: any) => {
    let { value } = event.target;
    value = value.replace(/\s+/g, '').replace(/[\u4E00-\u9FA5]/g, '');
    return value;
  };

  return (
    <div className={styles['login-view']}>
      <div className={styles.image}>
        <img alt="" src="/assets/login/sumian_login.png" />
      </div>

      <div className={styles['login-container']}>
        <div className={styles.welcome}>
          <p>{i18n('WELCOME')}</p>
          <p>{i18n('WELCOME_TIPS')}</p>
        </div>

        <Form
          form={form}
          name="loginForm"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          className={styles['login-form']}
        >
          <Form.Item
            label={i18n('USERNAME')}
            name="account"
            getValueFromEvent={getValidateValue}
            rules={[
              { required: true, message: i18n('RULE_NAME') },
              validateContentFormat(form, 'password'),
              { min: 1, max: 32, message: i18n('LOGIN_INPTU_USERNAME_LENGTH_WARNINGS') },
            ]}
          >
            <Input
              maxLength={32}
              className={styles['form-input']}
              placeholder={i18n('USERNAME_PLACEHOLDER')}
              suffix={<UserOutlined className="site-form-item-icon" />}
            />
          </Form.Item>

          <Form.Item
            name="password"
            label={i18n('PASSWORD')}
            getValueFromEvent={getValidateValue}
            rules={[
              { required: true, message: i18n('RULE_PWD') },
              validateContentFormat(form, 'password'),
              { min: 6, max: 16, message: i18n('LOGIN_INPTU_PASSWORD_LENGTH_WARNINGS') },
            ]}
          >
            <Input.Password
              maxLength={16}
              className={styles['form-input']}
              placeholder={i18n('PASSWORD_PLACEHOLDER')}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles['login-button']} loading={loading}>
              {i18n('LOGIN')}
            </Button>
          </Form.Item>
        </Form>

        <div className={styles.support}>
          <p>{i18n('VERSION')}</p>
          <p>{i18n('TECHNOLOGY_SUPPORT')}</p>
          <p>{i18n('CONNACT_INFO')}</p>
        </div>
      </div>
    </div>
  );
}
