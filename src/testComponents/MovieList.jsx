import React, { useState } from 'react';
import { Card, Row, Col, Typography, Rate, Button } from 'antd';
import { PlayCircleOutlined, ShoppingCartOutlined } from '@ant-design/icons';

const { Meta } = Card;
const { Title } = Typography;

const movies = [
  {
    title: 'Joker: Folie À Deux Điên Có Đôi',
    image: 'https://cdn.galaxycine.vn/media/2024/8/30/joker-folie-duex-500_1725002156768.jpg',
    rating: 8.1,
    ageRating: 'T18'
  },
  {
    title: 'Kumanthong: Chiếu Hồn Vong Nhi',
    image: 'https://cdn.galaxycine.vn/media/2024/8/30/joker-folie-duex-500_1725002156768.jpg',
    rating: 7.0,
    ageRating: 'T18'
  },
  {
    title: 'Mộ Đom Đóm',
    image: 'https://cdn.galaxycine.vn/media/2024/8/30/joker-folie-duex-500_1725002156768.jpg',
    rating: 8.7,
    ageRating: 'K'
  },
  {
    title: 'Đó Anh Cùng Được Tôi',
    image: 'https://cdn.galaxycine.vn/media/2024/8/30/joker-folie-duex-500_1725002156768.jpg',
    rating: 9.5,
    ageRating: 'T18'
  },
  {
    title: 'Vị Thanh Niên (400 Cú Đấm)',
    image: 'https://cdn.galaxycine.vn/media/2024/8/30/joker-folie-duex-500_1725002156768.jpg',
    rating: 7.0,
    ageRating: 'C13'
  },
  {
    title: 'Cá Trụi',
    image: 'https://cdn.galaxycine.vn/media/2024/8/30/joker-folie-duex-500_1725002156768.jpg',
    rating: 7.0,
    ageRating: 'T18'
  },
  {
    title: 'Hẹn Hò Với Sát Nhân',
    image: 'https://cdn.galaxycine.vn/media/2024/8/30/joker-folie-duex-500_1725002156768.jpg',
    rating: 7.0,
    ageRating: 'T18'
  },
  {
    title: 'Cậu Bé Cá Heo',
    image: 'https://cdn.galaxycine.vn/media/2024/8/30/joker-folie-duex-500_1725002156768.jpg',
    rating: 6.0,
    ageRating: 'P'
  },
];

const MovieCard = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      hoverable
      style={{ width: '400', position: 'relative', alignItems:'center' }}
      cover={<img alt={movie.title} src={movie.image} />}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Meta
        title={movie.title}
        description={
          <div>
            <Rate disabled defaultValue={movie.rating / 2} />
            <span style={{ marginLeft: 10 }}>{movie.rating}</span>
          </div>
        }
      />
      <div
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          background: '#ff4d4f',
          color: 'white',
          padding: '2px 8px',
          borderRadius: 4,
        }}
      >
        {movie.ageRating}
      </div>
      {isHovered && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.7)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <button
            style={{
              background: '#ff4d4f',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: 4,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            <ShoppingCartOutlined /> Mua vé
          </button>
          <button
            style={{
              background: '#1890ff',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: 4,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            <PlayCircleOutlined /> Trailer
          </button>
        </div>
      )}
    </Card>
  );
};

export default function MovieList() {
  return (
    <div style={{ margin:"0 20%"}}>
      <Title level={2}>Danh sách phim</Title>
      <Row gutter={[16, 16]}>
        {movies.map((movie, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6}>
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Button type="primary">Xem thêm</Button>
      </div>
    </div>
  );
}