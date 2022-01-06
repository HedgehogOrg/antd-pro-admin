import { Form, Input, Button, Checkbox } from 'antd';
import user from '../../stores/user';
import { useLocation, useNavigate } from 'react-router-dom';
import style from './login.module.css'

// hack ts 报类型未知的错
interface stateType {
  from: { pathname: string }
}

export default function Login() {
  const [form] = Form.useForm()

  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as stateType;
  const from = state?.from?.pathname || '/' ;

  // 本地校验成功
  const onFinish = (values: any) => {
    console.log('Success:', values);
    checkLogin(values)
  };

  const checkLogin = (values: any) => {
    // TODO post
    loginSuccess(values)
  }

  const loginSuccess = (values: any) => {
    // 记录登录状态
    user.login()
    // 模拟生成一些数据
    delete values.password
    user.setUser(Object.assign({}, values, { role: { type: 1, name: '超级管理员' } }));
    // 跳转
    navigate(from, { replace: true });
  }

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
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请填写用户名！' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请填写正确密码！', min: 6 }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>记住密码</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            登 录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
