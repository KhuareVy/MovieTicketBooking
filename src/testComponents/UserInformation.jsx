import React, { useState } from 'react';
import { Card, Button, Modal, Form, Input, DatePicker, notification } from 'antd';
import { EditOutlined, LockOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const UserInformation = () => {
  const [user, setUser] = useState({
    account: 'johndoe123',
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phoneNumber: '+1 (555) 123-4567',
    dateOfBirth: '1990-01-01',
  });

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);

  const showEditModal = () => setIsEditModalVisible(true);
  const showPasswordModal = () => setIsPasswordModalVisible(true);

  const handleEditCancel = () => setIsEditModalVisible(false);
  const handlePasswordCancel = () => setIsPasswordModalVisible(false);

  const handleEditSubmit = (values) => {
    setUser({ ...user, ...values, dateOfBirth: values.dateOfBirth.format('YYYY-MM-DD') });
    setIsEditModalVisible(false);
    notification.success({ message: 'User information updated successfully!' });
  };

  const handlePasswordSubmit = (values) => {
    // Here you would typically send a request to your backend to verify the old password
    // and update with the new password. For this example, we'll just show a success message.
    if (values.oldPassword === 'correctOldPassword') {
      setIsPasswordModalVisible(false);
      notification.success({ message: 'Password changed successfully!' });
    } else {
      notification.error({ message: 'Incorrect old password. Please try again.' });
    }
  };

  return (
    <Card title="User Information" style={{ maxWidth: 600, margin: '0 auto' }}>
      <p><strong>Account:</strong> {user.account}</p>
      <p><strong>Full Name:</strong> {user.fullName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
      <p><strong>Date of Birth:</strong> {user.dateOfBirth}</p>
      
      <Button icon={<EditOutlined />} onClick={showEditModal} style={{ marginRight: 8 }}>
        Edit Information
      </Button>
      <Button icon={<LockOutlined />} onClick={showPasswordModal}>
        Change Password
      </Button>

      <Modal
        title="Edit User Information"
        open={isEditModalVisible}
        onCancel={handleEditCancel}
        footer={null}
      >
        <Form
          initialValues={{
            ...user,
            dateOfBirth: dayjs(user.dateOfBirth),
          }}
          onFinish={handleEditSubmit}
        >
          <Form.Item
            name="fullName"
            label="Full Name"
            rules={[{ required: true, message: 'Please input your full name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[{ required: true, message: 'Please input your phone number!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="dateOfBirth"
            label="Date of Birth"
            rules={[{ required: true, message: 'Please select your date of birth!' }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Information
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Change Password"
        open={isPasswordModalVisible}
        onCancel={handlePasswordCancel}
        footer={null}
      >
        <Form onFinish={handlePasswordSubmit}>
          <Form.Item
            name="oldPassword"
            label="Old Password"
            rules={[{ required: true, message: 'Please input your old password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[
              { required: true, message: 'Please input your new password!' },
              { min: 8, message: 'Password must be at least 8 characters long!' },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirm New Password"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: 'Please confirm your new password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Change Password
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default UserInformation;