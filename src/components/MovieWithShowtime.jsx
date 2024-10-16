
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, message, Spin } from 'antd';
import { _get } from '../config/axiosConfig';
import MovieCard from '../components/MovieCard';

export default function MovieWithShowtime() {
  const { Title } = Typography;

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await _get('/movies');
        if (Array.isArray(response.data)) {
          setMovies(response.data);
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

  return (
    <div style={{ margin:"50px 20%"}}>
      <Title level={2}>Phim đang chiếu</Title>
      {loading ? (
        <Spin />
      ) : (
        <>
          <Row gutter={[16, 16]}>
            {movies.map((movie, index) => (
              <Col key={index} xs={24} sm={12} md={8} lg={6}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </div>
  );
};