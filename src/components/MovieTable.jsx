/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Table, Button, Space, Image } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const MovieTable = ({ movies, onEdit, onDelete }) => {
  const columns = [
    {
      title: 'Mã Phim',
      dataIndex: 'movieCode',
      key: 'movieCode',
    },
    {
      title: 'Hình Ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (image) => <Image src={image} alt="Movie poster" width={80} />,
    },
    {
      title: 'Tiêu Đề',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Mô Tả',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
      render: (text) => text.length > 50 ? `${text.substring(0, 100)}...` : text,
    },
    {
      title: 'Thể Loại',
      dataIndex: 'genre',
      key: 'genre',
    },
    {
      title: 'Diễn Viên',
      dataIndex: 'actor',
      key: 'actor',
    },
    {
      title: 'Đạo Diễn',
      dataIndex: 'director',
      key: 'director',
    },
    {
      title: 'Quốc Gia',
      dataIndex: 'country',
      key: 'country',
    },
    {
      title: 'Thời Lượng',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Ngày Phát Hành',
      dataIndex: 'releaseDate',
      key: 'releaseDate',
    },
    {
      title: 'Hành Động',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => onEdit(record)}>Sửa</Button>
          <Button icon={<DeleteOutlined />} onClick={() => onDelete(record.id)} danger>Xóa</Button>
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={movies} rowKey="id" scroll={{ x: true }} />;
};

export default MovieTable;