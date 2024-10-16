// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Button, Card, Tag, Typography, Grid, message, Divider } from 'antd';
import { _get, _post } from '../config/axiosConfig';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../contextAPI/AuthContext';

const { Text, Title } = Typography;
const { useBreakpoint } = Grid;

const SeatSelection = () => {
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [blockedSeats, setBlockedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]); // New state for booked seats
  const [totalPrice, setTotalPrice] = useState(0);
  const [socket, setSocket] = useState(null);
  const screens = useBreakpoint();
  const { logout, userName } = useContext(AuthContext);
  const { showtimeid, movieid } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const [showtime, setShowtime] = useState(null);

  useEffect(() => {
    fetchSeats();
    fetchBookedSeats(); // Fetch booked seats
    fetchMovie();
    fetchShowtimes();
    initializeWebSocket();  

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [showtimeid]);

  const initializeWebSocket = () => {
    const newSocket = new WebSocket('ws://localhost:8080/ws');

    newSocket.onopen = () => {
      console.log('WebSocket Connected');
      setSocket(newSocket);
      newSocket.send(JSON.stringify({ subscribe: '/topic/seats' }));
      newSocket.send(JSON.stringify({ subscribe: '/topic/unSetSeats' }));
    };

    newSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.topic === '/topic/seats') {
        setBlockedSeats(prevBlocked => [...prevBlocked, ...data.seats]);
      } else if (data.topic === '/topic/unSetSeats') {
        setBlockedSeats(prevBlocked => prevBlocked.filter(seat => !data.seats.includes(seat)));
      }
    };

    newSocket.onerror = (error) => {
      console.error('WebSocket Error:', error);
      message.error('Connection error. Please try again.');
    };

    newSocket.onclose = () => {
      console.log('WebSocket Disconnected');
      message.warning('Connection lost. Attempting to reconnect...');
      setTimeout(initializeWebSocket, 5000);
    };

    setSocket(newSocket);
  };

  const fetchSeats = async () => {
    try {
      const response = await _get(`/showtimes/${showtimeid}/seats`);
      const data = await response.data;
      setSeats(data);
    } catch (error) {
      console.error('Error fetching seats:', error);
      message.error('Failed to load seats. Please refresh the page.');

      if (error.response.status === 401) {
        logout();
        navigate('/login');
      }
    }
  };

  const fetchBookedSeats = async () => {
    try {
      const response = await _get(`/bookings/${showtimeid}`);
      const data = await response.data;
      const bookedSeatIds = data.map(booking => booking.seatId);
      setBookedSeats(bookedSeatIds);
    } catch (error) {
      console.error('Error fetching booked seats:', error);
      message.error('Failed to load booked seats. Please refresh the page.');
    }
  };

  const fetchMovie = async () => {
    try {
        const response = await _get(`/movies/${movieid}`);
        console.log('Response:', response);
        console.log('movieid:', movieid);
        setMovie(response.data);
    } catch (error) {
        console.error('Error fetching movie:', error);
    } 
  };

  const fetchShowtimes = async () => {
    try {
      const response = await _get(`/showtimes/movie/670d271b32a57a2ad2654f11`);
      const showtime = response.data;
      setShowtime(showtime);
    } catch (error) {
      console.error('Error fetching showtimes:', error);
    }
  };

  const sendWebSocketMessage = (endpoint, seatId) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const payload = JSON.stringify({ seatId, email: userName });
      socket.send(JSON.stringify({ destination: endpoint, body: payload }));
    } else {
      message.error('Connection issue. Please try again.');
    }
  };

  const handleSeatClick = (seat) => {
    if (blockedSeats.includes(seat.id) || bookedSeats.includes(seat.id)) return;

    setSelectedSeats(prevSelected => {
      if (prevSelected.includes(seat.id)) {
        const newTotalPrice = totalPrice - seat.price;
        setTotalPrice(newTotalPrice >= 0 ? newTotalPrice : 0);
        sendWebSocketMessage('/app/unSetSeats', seat.id);
        message.success('Seat deselected');
        return prevSelected.filter(id => id !== seat.id);
      } else {
        setTotalPrice(totalPrice + seat.price);
        sendWebSocketMessage('/app/seats', seat.id);
        message.success('Seat selected');
        return [...prevSelected, seat.id];
      }
    });
  };

  const handleBooking = async () => {
    const bookingRequest = {
      showtimeId: showtimeid,
      seatIds: selectedSeats,
      totalAmount: totalPrice,
    };

    console.log('Booking request:', bookingRequest);

    // const ticket = {
    //   ticketId: '123456',
    //   movieName: movie?.title,
    //   cinemaName: 'Cinema XYZ',
    //   screenNumber: 'Screen 1',
    //   showDate: '2023-10-01',
    //   startTime: '18:00',
    //   seatNumber: selectedSeats,
    //   bookingDate: new Date().toISOString().split('T')[0],
    //   userName: userName,
    //   totalAmount: totalPrice,
    // };

    // navigate('/dat-ve-thanh-cong', { state: { ticketinfor: ticket } });

    try {
      const response = await _post('/bookings', bookingRequest);
      message.success('Đặt vé thành công');
      const ticket = await response.data;
      navigate('/dat-ve-thanh-cong', { state: { ticketinfor: ticket } });
    } catch (error) {
      console.error('Error making booking:', error);
      if (error.response) {
        // Server responded with a status other than 200 range
        message.error(`Booking failed: ${error.response.data.message || error.response.statusText}`);
      } else if (error.request) {
        // Request was made but no response was received
        message.error('Booking failed: No response from server. Please try again.');
      } else {
        // Something else happened while setting up the request
        message.error(`Booking failed: ${error.message}`);
      }
    }
  };

  const renderSeat = (seat) => {
    const isSelected = selectedSeats.includes(seat.id);
    const isBlocked = blockedSeats.includes(seat.id);
    const isBooked = bookedSeats.includes(seat.id); // Check if the seat is booked
    let buttonType = 'default';
    let color = '';
    if (isSelected) buttonType = 'primary';
    if (isBlocked) buttonType = 'dashed';
    if (isBooked) color = 'danger';

    return (
      <Button
        key={seat.id}
        type={buttonType}
        color={color}
        disabled={isBlocked || isBooked} // Disable booked seats
        onClick={() => handleSeatClick(seat)}
        style={{ margin: '2px', width: screens.xs ? '30px' : '40px', height: screens.xs ? '30px' : '40px' }}
      >
        {seat.columnNumber}
      </Button>
    );
  };

  const renderSeats = () => {
    const seatsByRow = seats.reduce((acc, seat) => {
      if (!acc[seat.rowNumber]) acc[seat.rowNumber] = [];
      acc[seat.rowNumber].push(seat);
      return acc;
    }, {});

    return Object.entries(seatsByRow).map(([rowNumber, rowSeats]) => (
      <Row key={rowNumber} style={{ marginBottom: '10px' }}>
        <Col span={2}>
          <Text strong>{String.fromCharCode(64 + parseInt(rowNumber))}</Text>
        </Col>
        <Col span={22}>
          {rowSeats.map(renderSeat)}
        </Col>
      </Row>
    ));
  };

  return (
    <Card title="Chọn ghế" style={{ width: '100%' }}>
      <Divider orientation="left">Màn hình</Divider>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={16}>
          <div style={{ overflowX: 'auto' }}>
            {renderSeats()}
          </div>
          <div style={{ marginTop: '20px' }}>
            <Tag color="default">Ghế trống</Tag>
            <Tag color="blue">Ghế đang chọn</Tag>
            <Tag color="red">Ghế đã bán</Tag>
          </div>
        </Col>
        <Col xs={24} md={8}>
          <Card
                hoverable
                cover={<img alt={movie?.title} src={movie?.posterURL} style={{ height: 300, objectFit: 'cover' }} />}
              >
                <Card.Meta
                  title={movie?.title}
                  description={movie?.description}
                />
              <Title level={4}>Chọn ghế</Title>
              <Text>{selectedSeats.length} ghế đang chọn</Text>
              <Title level={4}>Thành tiền</Title>
              <Text>{totalPrice.toLocaleString()} VND</Text>
              <Button type="primary" block style={{ marginTop: '20px' }}
                onClick={handleBooking} disabled={selectedSeats.length === 0}
                >
                  Đặt vé
              </Button>
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default SeatSelection;