/* eslint-disable no-unused-vars */
// src/components/MovieManagement.jsx
import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Row, Col, message, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import MovieTable from './MovieTable';
import MovieForm from './MovieForm';
import MovieSearch from './MovieSearch';
import { transformMovieData, transformAMovieData } from '../utils/transformData';
import { _get, _post, _put } from '../config/axiosConfig';

const MovieManagement = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingMovie, setEditingMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await _get('/movies');
        if (Array.isArray(response.data)) {
          const transformedData = transformMovieData(response.data);
          setMovies(transformedData);
          setFilteredMovies(transformedData);

          console.log('transformedData:', transformedData);
        } else {
          console.error('API response is not an array:', response.data);
          message.error('Failed to fetch movies');
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
        message.error('Failed to fetch movies');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

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

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      let updatedMovies;
      if (editingMovie) {
        const updatedMovieData = {
          title: values.title,
          duration: values.duration,
          releaseDate: values.releaseDate,
          description: values.description,
          posterURL: values.image,
          trailerURL: values.trailer,
          directorID: values.director,
          actorIDs: values.actors,
          countryID: values.country,
          genreID: values.genre,
        };
        console.log('updatedMovieData:', updatedMovieData);
        console.log('values:', values);
        const response = await _put(`/movies/${editingMovie.id}`, updatedMovieData);
        const updatedMovie = response.data;
        updatedMovies = movies.map(movie => movie.id === editingMovie.id ? transformAMovieData(updatedMovie) : movie);

        message.success({
          content: 'Cập nhật phim thành công',
        });
      } else {
        const newMovieData = {
          title: values.title,
          duration: values.duration,
          releaseDate: values.releaseDate,
          description: values.description,
          posterURL: values.image,
          trailerURL: values.trailer,
          directorID: values.director,
          actorIDs: values.actors,
          countryID: values.country,
          genreID: values.genre,
        };
        // console.log('newMovieData:', newMovieData);
        const response = await _post('/movies', newMovieData);
        const newMovie = response.data;
        updatedMovies = [...movies, newMovie];

        message.success({
          content: 'Thêm mới phim thành công',
        });
      }
      setMovies(updatedMovies);
      setFilteredMovies(updatedMovies);
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error saving movie:', error);
      message.error('Failed to save movie');
    }
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
          <MovieSearch onSearch={handleSearch} value={searchTerm} />
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
      {loading ? (
        <Spin size="large" style={{ display: 'block', margin: '20px auto' }} />
      ) : (
        <MovieTable movies={filteredMovies} onEdit={handleEdit} onDelete={handleDelete} />
      )}
      <MovieForm
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleModalOk}
        form={form}
        editingMovie={editingMovie}
      />
    </div>
  );
};

export default MovieManagement;