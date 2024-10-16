// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Form, Input, Button, Typography, Row, Col, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contextAPI/AuthContext';
import { _post } from '../config/axiosConfig';

const { Title } = Typography;

export default function Login() {
  const [form] = Form.useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const redirectPath = location.state?.path || '/';

  const onFinish = async (values) => {
    console.log('Login form submitted:', values);

    const loginData = {
      userName: values.username,
      password: values.password,
    };

    try {
      const response = await _post('/auth/login', loginData);

      const { data } = response;
      console.log('Login response:', data);
      message.success('Đăng nhập thành công');

      login(values.username, data.token);
      // navigate(redirectPath, { replace: true });

      if(data.roles === '[admin]') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    } catch (error) {
      console.error('Login error:', error);
      message.error('Đăng nhập thất bại');
    }

    
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '50vh' }}>
      <Col xs={22} sm={16} md={12} lg={8} xl={6}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '2rem' }}>
          Đăng nhập
        </Title>
        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: 'Please input your username!' },
            ]}
            validateTrigger="onSubmit"
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
            ]}
            validateTrigger="onSubmit"
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Đăng nhập
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="link" block>
              <Link to="/register">Đăng kí</Link>
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}