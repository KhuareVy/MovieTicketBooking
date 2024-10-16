// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Form, Input, Button, Typography, Row, Col, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { _post } from '../config/axiosConfig';

const { Title } = Typography;

const Registration = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const response = await _post('/auth/register', values);
      const data = await response.data;
      message.success('Đăng kí thành công');
    } catch (error) {
      const { response } = error;
      if (response.status === 400) {
        const errorFields = Object.keys(response.data).map((field) => ({
          name: field,
          errors: [response.data[field]],
        }));
        form.setFields(errorFields);
      }
      message.error('Đăng kí thất bại');
      console.error('Registration failed:', error);
    }
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '70vh' }}>
      <Col xs={22} sm={16} md={12} lg={8} xl={6}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '2rem' }}>
          Đăng kí
        </Title>
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name='name'
            rules={[{
              required: true,
              message: 'Vui lòng nhập họ tên',
            }]}
          >
            <Input prefix={<UserOutlined />} placeholder='Họ tên' />
          </Form.Item>
          <Form.Item
            name='email'
            rules={[
              {
                type: 'email',
                message: 'Email không hợp lệ',
              },
              {
                required: true,
                message: 'Vui lòng nhập email',
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder='Email' />
          </Form.Item>
          <Form.Item
            name='dateOfBirth'
            rules={[{
              required: true,
              message: 'Vui lòng nhập ngày sinh',
            }]}
          >
            <Input type="date" placeholder='Ngày sinh' />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mật khẩu',
              },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder='Mật khẩu' />
          </Form.Item>
          <Form.Item
            name='confirmPassword'
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: 'Vui lòng xác nhận mật khẩu',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu không khớp'));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder='Xác nhận mật khẩu' />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Đăng kí
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="link" block>
              <Link to="/login">Đăng nhập</Link>
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Registration;