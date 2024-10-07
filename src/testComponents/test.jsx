import React, { useState } from 'react';
import { Typography, Row, Col, Space, Tag, Rate, Button, Tabs, Modal } from 'antd';
import { CalendarOutlined, GlobalOutlined, PlayCircleOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

export default function MovieDetails() {
  const [isTrailerModalVisible, setIsTrailerModalVisible] = useState(false);

  const movie = {
    title: "Joker: Folie à Deux",
    subTitle: "Điên Có Đôi",
    banner: "https://cdn.galaxycine.vn/media/2023/12/6/joker-1_1701829315806.jpg",
    poster: "https://cdn.galaxycine.vn/media/2023/12/6/joker-2_1701829316093.jpg",
    rating: 8.2,
    duration: "138 phút",
    releaseDate: "04.10.2024",
    country: "Mỹ",
    production: "DC Entertainment, Warner Bros",
    genre: ["Tâm Lý", "Âm Nhạc"],
    director: "Todd Phillips",
    actors: ["Joaquin Phoenix", "Lady Gaga", "Zazie Beetz"],
    synopsis: "Sau các sự kiện của phần phim trước, Arthur Fleck / Joker tiếp tục hành trình điên loạn của mình, lần này với người đồng hành là nàng hề Harley Quinn.",
    trailerUrl: "https://www.youtube.com/embed/03JGPWzfh4",
  };

  const showTrailerModal = () => {
    setIsTrailerModalVisible(true);
  };

  const handleTrailerModalClose = () => {
    setIsTrailerModalVisible(false);
  };

  return (
    <div style={{ backgroundColor: '#0f0f0f', color: 'white', minHeight: '100vh' }}>
      <div style={{ position: 'relative', height: '500px', overflow: 'hidden' }}>
        <img src={movie.banner} alt={movie.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)' }} />
        <Button 
          icon={<PlayCircleOutlined />} 
          size="large" 
          style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          onClick={showTrailerModal}
        >
          Xem Trailer
        </Button>
      </div>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px' }}>
        <Row gutter={[32, 32]}>
          <Col xs={24} md={6}>
            <img src={movie.poster} alt={movie.title} style={{ width: '100%', borderRadius: 8 }} />
          </Col>
          <Col xs={24} md={18}>
            <Title level={2} style={{ color: 'white', marginBottom: 0 }}>{movie.title}</Title>
            <Title level={3} style={{ color: '#888', marginTop: 0 }}>{movie.subTitle}</Title>
            <Space style={{ marginBottom: 16 }}>
              <Tag color="orange">C18</Tag>
              <Rate disabled defaultValue={movie.rating / 2} style={{ fontSize: 14 }} />
              <Text style={{ color: 'white' }}>{movie.rating}</Text>
              <Text style={{ color: '#888' }}>216 đánh giá</Text>
            </Space>
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
              <Text style={{ color: 'white' }}><CalendarOutlined /> {movie.duration} - {movie.releaseDate}</Text>
              <Text style={{ color: 'white' }}><GlobalOutlined /> {movie.country}</Text>
              <Text style={{ color: 'white' }}>Nhà sản xuất: {movie.production}</Text>
              <div>
                <Text style={{ color: 'white' }}>Thể loại: </Text>
                {movie.genre.map((g) => (
                  <Tag key={g} style={{ marginRight: 8 }}>{g}</Tag>
                ))}
              </div>
              <Text style={{ color: 'white' }}>Đạo diễn: {movie.director}</Text>
              <div>
                <Text style={{ color: 'white' }}>Diễn viên: </Text>
                {movie.actors.map((actor) => (
                  <Tag key={actor} style={{ marginRight: 8 }}>{actor}</Tag>
                ))}
              </div>
            </Space>
          </Col>
        </Row>
        <Tabs defaultActiveKey="1" style={{ marginTop: 32 }}>
          <TabPane tab="Tóm Tắt" key="1">
            <Paragraph style={{ color: 'white' }}>{movie.synopsis}</Paragraph>
          </TabPane>
          <TabPane tab="Lịch Chiếu" key="2">
            <Text style={{ color: 'white' }}>Chưa có lịch chiếu cho phim này.</Text>
          </TabPane>
        </Tabs>
      </div>
      <Modal
        title="Trailer"
        open={isTrailerModalVisible}
        onCancel={handleTrailerModalClose}
        footer={null}
        width={800}
      >
        <iframe
          width="100%"
          height="450"
          src={movie.trailerUrl}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </Modal>
    </div>
  );
}