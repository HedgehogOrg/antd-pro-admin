import React, { Component, createRef } from 'react';
import { Form, Input, Button, Checkbox, FormInstance } from 'antd';
import UserInfo from '../../stores/user';
import { useNavigate } from 'react-router-dom';
import Go from '../../components/Go';

function LoginSuccess(values: any) {

  // const navigate = useNavigate();
  // UserInfo.setLogin(true)
  // localStorage.setItem('isLogin', '1');
  // // 模拟生成一些数据
  // UserInfo.setUserInfo(Object.assign({}, values, { role: { type: 1, name: '超级管理员' } }));
  // localStorage.setItem('userInfo', JSON.stringify(Object.assign({}, values, { role: { type: 1, name: '超级管理员' } })));
  // navigate('/dashboard');
}

export default function Login() {
  const [form] = Form.useForm()

  const navigate = useNavigate();

  const onFinish = (values: any) => {
    console.log('Success:', values);

    // LoginSuccess(values)
    navigate('/dashboard')
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className="content">
      <div className="title">后台管理系统</div>
      <Go url="/dashboard"></Go>
      <Form
        form={form}
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
          rules={[{ required: true, message: '请填写密码！' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
