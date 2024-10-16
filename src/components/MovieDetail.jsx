// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Typography, Image, Space, Divider, Tag, Button, Avatar, Spin, Select, List } from 'antd';
import { PlayCircleOutlined, ClockCircleOutlined, GlobalOutlined, CalendarOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { _get } from '../config/axiosConfig';
// import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;

export default function MovieDetailPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('2024-10-15');
  const [selectedCinema, setSelectedCinema] = useState('all');
  const [showtimes, setShowtimes] = useState([]);
  const [cinemas, setCinemas] = useState([]);

  const navigate = useNavigate();

  const getNext7Days = () => {
    const days = [];
    const today = new Date();
    const dayNames = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dayName = i === 0 ? 'Hôm Nay' : dayNames[date.getDay()];
      const formattedDate = date.toISOString().split('T')[0];
      days.push({ label: dayName, value: formattedDate });
    }

    return days;
  };

  const dateOptions = getNext7Days();

  const fetchMovie = async () => {
    try {
      const response = await _get(`/movies/${id}`);
      const movie = await response.data;
      console.log('Response:', response);
      setMovie(movie);
    } catch (error) {
      console.error('Error fetching movie:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchShowtimes = async () => {
    try {
      const response = await _get(`/showtimes/movie/${id}`);
      const showtimes = await response.data;

      // Transform the data
      const transformedShowtimes = showtimes.reduce((acc, showtime) => {
        const { id, cinemaName, startTime, date } = showtime;
        const cinema = acc.find(item => item.cinema === cinemaName && item.date === date);
        if (cinema) {
          cinema.times.push({ time: startTime, id });
        } else {
          acc.push({ cinema: cinemaName, date, times: [{ time: startTime, id }] });
        }
        return acc;
      }, []);

      setShowtimes(transformedShowtimes);

      // Extract unique cinema names
      const uniqueCinemas = [...new Set(showtimes.map(showtime => showtime.cinemaName))];
      setCinemas(uniqueCinemas);
      console.log('Transformed showtimes:', transformedShowtimes);
    } catch (error) {
      console.error('Error fetching showtimes:', error);
    }
  };

  useEffect(() => {
    fetchMovie();
    fetchShowtimes();
  }, [id]);

  if (loading) {
    return <Spin size="large" style={{ display: 'block', margin: '20px auto' }} />;
  }

  if (!movie) {
    return <div>Error loading movie details.</div>;
  }

  const filteredShowtimes = showtimes.filter(showtime => 
    showtime.date === selectedDate && (selectedCinema === 'all' || showtime.cinema === selectedCinema)
  );

  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <Image
            src={movie.posterURL}
            alt={movie.title}
            style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
          />
        </Col>
        <Col xs={24} md={16}>
          <Title level={2}>{movie.title}</Title>
          <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Text>{movie.description}</Text>
            <Space>
              <Tag icon={<ClockCircleOutlined />} color="blue">{movie.duration} minutes</Tag>
              <Tag color="magenta">{movie.genre.name}</Tag>
              <Tag icon={<GlobalOutlined />} color="green">{movie.country.name}</Tag>
            </Space>
            <Text strong>Release Date: {movie.releaseDate}</Text>
            <a href={movie.trailerURL} target="_blank" rel="noopener noreferrer">
              <Button icon={<PlayCircleOutlined />}>Watch Trailer</Button>
            </a>
          </Space>
        </Col>
      </Row>

      <Divider orientation="left">Director</Divider>
      <Card>
        <Card.Meta
          avatar={<Avatar src={movie.director.picture} size={64} />}
          title={movie.director.name}
          description={`Born: ${movie.director.birthDate}`}
        />
      </Card>

      <Divider orientation="left">Cast</Divider>
      <Row gutter={[16, 16]}>
        {movie.actors.map((actor) => (
          <Col xs={24} sm={12} md={8} lg={6} key={actor.id}>
            <Card
              hoverable
              cover={<img alt={actor.name} src={actor.picture} style={{ height: 300, objectFit: 'cover' }} />}
            >
              <Card.Meta
                title={actor.name}
                description={`Born: ${actor.birthDate}`}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Divider orientation="left">Showtimes</Divider>
      <Card>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Row gutter={16} align="middle">
            <Col>
              <Title level={4} style={{ margin: 0 }}>Lịch Chiếu</Title>
            </Col>
            <Col>
              <Space>
                {dateOptions.map((date) => (
                  <Button
                    key={date.value}
                    type={selectedDate === date.value ? 'primary' : 'default'}
                    onClick={() => setSelectedDate(date.value)}
                    icon={<CalendarOutlined />}
                  >
                    {date.label}
                    <br />
                    {date.value}
                  </Button>
                ))}
              </Space>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Select 
                defaultValue="all" 
                style={{ width: '100%' }} 
                onChange={(value) => setSelectedCinema(value)}
              >
                <Option value="all">Tất cả rạp</Option>
                {cinemas.map(cinema => (
                  <Option key={cinema} value={cinema}>{cinema}</Option>
                ))}
              </Select>
            </Col>
          </Row>
          <List
            dataSource={filteredShowtimes}
            renderItem={(item) => (
              <List.Item>
                <Card title={item.cinema} style={{ width: '100%' }}>
                  <Space wrap>
                    {item.times.map(({ time, id }) => (
                      <Button key={id} onClick={() => {
                        console.log('Showtime ID:', id);
                        navigate(`/dat-ve/${id}/${movie.id}`);
                      }}>{time}</Button>
                    ))}
                  </Space>
                </Card>
              </List.Item>
            )}
          />
        </Space>
      </Card>
    </div>
  );
}