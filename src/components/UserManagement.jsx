import React, { useState } from 'react';
import {
  Table,
  Input,
  Button,
  Space,
  Modal,
  Form,
  Select,
  message,
  Row,
  Col
} from 'antd';
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';

const { Option } = Select;

const UserManagement = () => {
  const [users, setUsers] = useState([
    { key: 1, username: 'admin1', email: 'admin1@example.com', fullName: 'Nguyễn Văn A', phone: '1234567890', role: 'admin' },
    { key: 2, username: 'user1', email: 'user1@example.com', fullName: 'Trần Văn B', phone: '0987654321', role: 'user' },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const showModal = () => {
    setIsModalVisible(true);
    setEditingKey(null);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingKey(null);
  };

  const onFinish = (values) => {
    if (editingKey !== null) {
      setUsers(users.map(user => user.key === editingKey ? { ...values, key: editingKey } : user));
      message.success('Cập nhật thành công');
    } else {
      const newUser = {
        ...values,
        key: users.length + 1,
      };
      setUsers([...users, newUser]);
      message.success('Thêm thành công');
    }
    setIsModalVisible(false);
  };

  const handleEdit = (record) => {
    form.setFieldsValue(record);
    setEditingKey(record.key);
    setIsModalVisible(true);
  };

  const handleDelete = (key) => {
    Modal.confirm({
      title: 'Bạn có chắc chắn muốn xóa phim này?',
      onOk: () => {
        setUsers(users.filter(user => user.key !== key));
        message.success('Xóa thành công');
      },
    });
  };

  const columns = [
    {
      title: 'Tài khoản',
      dataIndex: 'username',
      key: 'username',
      sorter: (a, b) => a.username.localeCompare(b.username),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
      responsive: ['md'],
    },
    {
      title: 'Họ tên',
      dataIndex: 'fullName',
      key: 'fullName',
      sorter: (a, b) => a.fullName.localeCompare(b.fullName),
    },
    {
      title: 'SĐT',
      dataIndex: 'phone',
      key: 'phone',
      responsive: ['lg'],
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (role === 'admin' ? 'Admin' : 'User'),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>Sửa</Button>
          <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.key)} danger>Xóa</Button>
        </Space>
      ),
    },
  ];

  const filteredUsers = users.filter(user => 
    (user.username.toLowerCase().includes(searchText.toLowerCase()) ||
    user.email.toLowerCase().includes(searchText.toLowerCase()) ||
    user.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
    user.phone.includes(searchText)) &&
    (roleFilter === 'all' || user.role === roleFilter)
  );

  return (
    <div style={{ padding: '20px' }}>
      <h1>Quản lý người dùng</h1>
      <Row gutter={[16, 16]} align="middle" justify="start" style={{ marginBottom: '16px' }}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Input
            placeholder="Tìm kiếm"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Select
            style={{ width: '100%' }}
            placeholder="Lọc theo vai trò"
            onChange={(value) => setRoleFilter(value)}
            defaultValue="all"
          >
            <Option value="all">Tất cả vai trò</Option>
            <Option value="admin">Admin</Option>
            <Option value="user">Người dùng</Option>
          </Select>
        </Col>
        <Col xs={24} sm={24} md={8} lg={6}>
          <Button type="primary" icon={<PlusOutlined />} onClick={showModal} style={{ width: '100%' }}>
            Thêm người dùng
          </Button>
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={filteredUsers}
        rowKey="key"
        scroll={{ x: 'max-content' }}
      />

      <Modal
        title={editingKey !== null ? "Chỉnh sửa người dùng" : "Thêm người dùng mới"}
        open={isModalVisible}
        onCancel={handleCancel}
        width={600}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            label="Tài khoản"
            rules={[{ required: true, message: 'Vui lòng điền tên tài khoản!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Vui lòng điền email!' },
              { type: 'email', message: 'Vui lòng nhập email hợp lệ!' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="fullName"
            label="Họ tên"
            rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="role"
            label="Vai trò"
            rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}
          >
            <Select>
              <Option value="admin">Admin</Option>
              <Option value="user">Người dùng</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingKey !== null ? 'Cập nhật' : 'Thêm'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;