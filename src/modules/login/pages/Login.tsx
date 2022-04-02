import {
  Form, Input, Button, Checkbox, message,
} from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import user from '@/stores/user';
import style from './login.module.less';
import { setIntlModule } from '@/utils/utils';
import { LocationStateType } from '@/types/routes';

export default function Login() {
  // form
  const [form] = Form.useForm();

  // location
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationStateType;
  const from = state?.from?.pathname || '/';

  // 多语言
  const t = setIntlModule('login');

  // 本地校验成功
  const onFinish = (values: any) => {
    checkLogin(values);
  };

  const checkLogin = (values: any) => {
    user.login(values).then(() => {
      message.success(t('LOGIN_SUCCESS'));
      // 跳转
      navigate(from, { replace: true });
    });
  };

  // 本地校验失败
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div>
      <Form
        form={form}
        className={style['login-form']}
        name="loginForm"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label={t('USERNAME')}
          name="username"
          rules={[{ required: true, message: t('RULE_NAME') }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={t('PASSWORD')}
          name="password"
          rules={[{ required: true, message: t('RULE_PWD') }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>{t('REMEMBER')}</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            {t('LOGIN')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
