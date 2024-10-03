import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, Space, Image, Row, Col, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const MovieManagement = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingMovie, setEditingMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulating API call to fetch movies
    const initialMovies = [
      {
        id: 1,
        movieCode: 'MOV001',
        title: 'Inception',
        description: 'A thief who enters the dreams of others to steal secrets from their subconscious.',
        image: 'https://th.bing.com/th/id/R.ff96b4e3590eb34eab11a58b4c0f8639?rik=X3b1jS86vhKDGw&pid=ImgRaw&r=0',
        trailer: 'https://www.youtube.com/watch?v=YoHD9XEInc0',
        genre: 'Phim khoa học',
        actor:'Leonardo DiCaprio',
        director:'Christopher Nolan',
        country: 'Mỹ'
      },
      {
        id: 2,
        movieCode: 'MOV002',
        title: 'The Godfather',
        description: 'The aging patriarch of an organized crime dynasty transfers control to his reluctant son.',
        image: 'https://th.bing.com/th/id/R.946f68bd8e0670d5efd56270bbe68340?rik=QtORjTYYjf7P%2bw&pid=ImgRaw&r=0',
        trailer: 'https://www.youtube.com/watch?v=sY1S34973zA',
        genre: 'Phim hành động',
        actor:'Marlon Brando',
        director:'Francis Ford Coppola',
        country: 'Mỹ'
      }
    ];
    setMovies(initialMovies);
    setFilteredMovies(initialMovies);
  }, []);

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
    },
    {
      title: 'Hành Động',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>Sửa</Button>
          <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} danger>Xóa</Button>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingMovie(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (movie) => {
    setEditingMovie(movie);
    form.setFieldsValue(movie);
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    const updatedMovies = movies.filter(movie => movie.id !== id);
    Modal.confirm({
      title: 'Bạn có chắc chắn muốn xóa phim này?',
      onOk: () => {
        setMovies(updatedMovies);
        setFilteredMovies(updatedMovies);
        message.success({
          content: 'Xóa thành công',
        });
      },
    });
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      let updatedMovies;
      if (editingMovie) {
        updatedMovies = movies.map(movie => movie.id === editingMovie.id ? { ...movie, ...values } : movie);
      } else {
        const newMovie = {
          id: Math.max(...movies.map(m => m.id), 0) + 1,
          ...values,
        };
        updatedMovies = [...movies, newMovie];
      }
      setMovies(updatedMovies);
      setFilteredMovies(updatedMovies);
      setIsModalVisible(false);
    });
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    const filtered = movies.filter(movie => 
      movie.movieCode.toLowerCase().includes(value.toLowerCase()) ||
      movie.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Quản Lý Phim</h1>
      <Row gutter={[16, 16]} align="middle" justify="start">
        <Col xs={24} sm={12} md={8} lg={6}>
          <Input
            placeholder="Tìm kiếm theo mã phim hoặc tiêu đề"
            prefix={<SearchOutlined />}
            onChange={(e) => handleSearch(e.target.value)}
            value={searchTerm}
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAdd}
            style={{ width: '100%' }}
          >
            Thêm Phim
          </Button>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={filteredMovies}
        rowKey="id"
        scroll={{ x: true }}
        style={{ marginTop: '20px' }}
      />
      <Modal
        title={editingMovie ? 'Chỉnh Sửa Phim' : 'Thêm Phim'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={700}
      >
        <Form form={form} layout="vertical" >
          <Form.Item
            name="movieCode"
            label="Mã Phim"
            rules={[{ required: true, message: 'Vui lòng nhập mã phim!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="title"
            label="Tiêu Đề"
            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô Tả"
            rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="image"
            label="URL Hình Ảnh"
            rules={[{ required: true, message: 'Vui lòng nhập URL hình ảnh!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="trailer"
            label="URL Trailer"
            rules={[{ required: true, message: 'Vui lòng nhập URL trailer!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="genre"
            label="Thể Loại"
            rules={[{ required: true, message: 'Vui lòng chọn thể loại!' }]}
          >
            <Select>
              <Select.Option value="Action">Hành Động</Select.Option>
              <Select.Option value="Comedy">Hài</Select.Option>
              <Select.Option value="Family">Gia Đình</Select.Option>
              <Select.Option value="Sci-Fi">Khoa Học Viễn Tưởng</Select.Option>
              <Select.Option value="Horror">Kinh Dị</Select.Option>
              <Select.Option value="Cartoon">Hoạt Hình</Select.Option>
              <Select.Option value="Romance" >Lãng Mạn</Select.Option>
              <Select.Option value="Adventure">Phiêu Lưu</Select.Option>
              <Select.Option value="Mistery">Bí Ẩn</Select.Option>

            </Select>
          </Form.Item>
          <Form.Item
            name="actor"
            label="Diễn Viên"
            rules={[{ required: true, message: 'Vui lòng tên diễn viên!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="director"
            label="Đạo diễn"
            rules={[{ required: true, message: 'Vui lòng tên đạo diễn!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="country"
            label="Quốc Gia"
            rules={[{ required: true, message: 'Vui lòng nhập quốc gia!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MovieManagement;