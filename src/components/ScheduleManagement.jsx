// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Table, Select, Input, Button, Modal, Form, DatePicker, TimePicker, message, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { _get, _post } from '../config/axiosConfig';

const { Option } = Select;

export default function ScheduleManagement() {
  const [schedules, setSchedules] = useState([]);
  const [filteredSchedules, setFilteredSchedules] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState('ALL');
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [cinemas, setCinemas] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchSchedules();
    fetchCinemas();
    fetchMovies();
  }, []);

  useEffect(() => {
    filterSchedules();
  }, [schedules, selectedCinema, searchText]);

  const fetchSchedules = async () => {
    try {
      const response = await _get('/showtimes');
      const transformedData = response.data.map(item => ({
        id: item.id,
        date: item.date,
        cinema: item.cineama.cinemaName,
        movie: item.movie.title,
        room: `Rạp ${item.cineama.screenNumber}`,
        showtime: item.startTime,
      }));
      setSchedules(transformedData);
    } catch (error) {
      console.error('Error fetching schedules:', error);
      message.error('Failed to fetch schedules');
    } finally {
      setLoading(false);
    }
  };

  const fetchCinemas = async () => {
    try {
      const response = await _get('/cinemas');
      if(Array.isArray(response.data)) {
        const cinemaOptions = response.data.map(cinema => ({
          label: cinema.name,
          value: cinema.id,
          screens: cinema.screens,
        }));
        setCinemas(cinemaOptions);
      } else {
        console.error('API response is not an array:', response.data);
        message.error('Failed to fetch cinemas');
      }
    } catch (error) {
      console.error('Error fetching cinemas:', error);
      message.error('Failed to fetch cinemas');
    }
  };

  const fetchMovies = async () => {
    try {
      const response = await _get('/movies');
      if (Array.isArray(response.data)) {
        const movieOptions = response.data.map(movie => ({
          label: movie.title,
          value: movie.id,
          duration: movie.duration,
        }));
        setMovies(movieOptions);
      } else {
        console.error('API response is not an array:', response.data);
        message.error('Failed to fetch movies');
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      message.error('Failed to fetch movies');
    }
  };

  const filterSchedules = () => {
    let filtered = [...schedules];
    if (selectedCinema !== 'ALL') {
      filtered = filtered.filter(schedule => schedule.cinema === selectedCinema);
    }
    if (searchText) {
      const lowerSearchText = searchText.toLowerCase();
      filtered = filtered.filter(schedule =>
        schedule.movie.toLowerCase().includes(lowerSearchText) ||
        schedule.room.toLowerCase().includes(lowerSearchText) ||
        schedule.date.includes(lowerSearchText) ||
        schedule.showtime.includes(lowerSearchText)
      );
    }
    setFilteredSchedules(filtered);
  };

  const showModal = (schedule = null) => {
    setEditingSchedule(schedule);
    if (schedule) {
      form.setFieldsValue({
        ...schedule,
        date: dayjs(schedule.date),
        showtime: dayjs(schedule.showtime, 'HH:mm'),
      });
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      const newSchedule = {
        ...values,
        date: values.date.format('YYYY-MM-DD'),
        showtime: values.showtime.format('HH:mm'),
      };

      // console.log('newSchedule:', newSchedule);
      const selectedMovie = movies.find(movie => movie.value === newSchedule.movie);
      if (!selectedMovie) {
        message.error('Selected movie not found');
        return;
      }

      const endTime = dayjs(newSchedule.showtime, 'HH:mm')
      .add(selectedMovie.duration, 'minute')
      .format('HH:mm');

      const scheduleData = {
        date: newSchedule.date,
        startTime: newSchedule.showtime,
        endTime: endTime,
        movieID: newSchedule.movie,
        screenID: newSchedule.room,
      };

      // console.log('scheduleData:', scheduleData);
      try {
        await _post('/showtimes', scheduleData);
        setLoading(true);
        fetchSchedules();
        setIsModalVisible(false);
        message.success('Thêm lịch chiếu thành công');
      } catch (error) {
        console.error('Error saving schedule:', error);
        const errorMessage = error.response?.data?.error || 'Trùng lịch chiếu';
        message.error(errorMessage);
      }
    });
  };

  const saveSchedule = (newSchedule) => {
    if (editingSchedule) {
      setSchedules(schedules.map(schedule => 
        schedule.id === editingSchedule.id ? { ...newSchedule, id: schedule.id } : schedule
      ));
      message.success('Cập nhật thành công');
    } else {
      setSchedules([...schedules, { ...newSchedule, id: Date.now() }]);
      message.success('Thêm lịch chiếu thành công');
    }
    setIsModalVisible(false);
  };

  const handleDelete = (schedule) => {
    Modal.confirm({
      title: 'Xóa lịch chiếu',
      content: 'Bạn có chắc chắn muốn xóa lịch chiếu này?',
      onOk: () => {
        setSchedules(schedules.filter(s => s.id !== schedule.id));
        message.success('Xóa lịch chiếu thành công');
      },
    });
  };

  const checkConflicts = (newSchedule) => {
    return schedules.some(schedule => 
      schedule.date === newSchedule.date &&
      schedule.cinema === newSchedule.cinema &&
      schedule.room === newSchedule.room &&
      schedule.showtime === newSchedule.showtime &&
      (!editingSchedule || schedule.id !== editingSchedule.id)
    );
  };

  const handleCinemaChange = (cinemaId) => {
    const selectedCinema = cinemas.find(cinema => cinema.value === cinemaId);
    if (selectedCinema) {
      setRooms(selectedCinema.screens);
      form.setFieldsValue({ room: null }); // Reset room field when cinema changes
    }
  };

  // const handleMovieChange = (movieId) => {
  //   const selectedMovie = movies.find(movie => movie.value === movieId);
  //   if (selectedMovie) {
  //     form.setFieldsValue({ duration: selectedMovie.duration });
  //   }
  // }

  const columns = [
    {
      title: 'Ngày chiếu',
      dataIndex: 'date',
      sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
    },
    {
      title: 'Rạp',
      dataIndex: 'cinema',
      sorter: (a, b) => a.cinema.localeCompare(b.cinema),
    },
    {
      title: 'Phim',
      dataIndex: 'movie',
      sorter: (a, b) => a.movie.localeCompare(b.movie),
    },
    {
      title: 'Phòng',
      dataIndex: 'room',
      sorter: (a, b) => a.room.localeCompare(b.room),
    },
    {
      title: 'Suất chiếu',
      dataIndex: 'showtime',
      sorter: (a, b) => dayjs(a.showtime, 'HH:mm').unix() - dayjs(b.showtime, 'HH:mm').unix(),
    },
    // {
    //   title: 'Hành động',
    //   render: (_, record) => (
    //     <>
    //       <Button icon={<EditOutlined />} onClick={() => showModal(record)}>Sửa</Button>
    //       <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record)} style={{ marginLeft: 8 }} danger={true}>Xóa</Button>
    //     </>
    //   ),
    // },
  ];

  return (
    <div style={{ padding: '20px' }}>
       <h1>Quản Lý Lịch Chiếu</h1>
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <Select
          style={{ width: 200, marginBottom: '10px' }}
          value={selectedCinema}
          onChange={setSelectedCinema}
        >
          <Option value="ALL">Tất cả</Option>
          {cinemas.map(cinema => (
            <Option key={cinema.value} value={cinema.value}>{cinema.label}</Option>
          ))}
        </Select>
        <Input.Search
          placeholder="Search movies, rooms, dates, or showtimes"
          style={{ width: 300, marginBottom: '10px' }}
          onSearch={setSearchText}
          onChange={e => setSearchText(e.target.value)}
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
          Thêm lịch chiếu
        </Button>
      </div>

      {loading ? (
        <Spin size="large" style={{ display: 'block', margin: '20px auto' }} />
      ) : (
        <Table
        columns={columns}
        dataSource={filteredSchedules}
        rowKey="id"
        scroll={{ x: true }}
      />
      )}

      <Modal
        title={editingSchedule ? "Edit Schedule" : "Add Schedule"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="date" label="Date" rules={[{ required: true }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="cinema" label="Cinema" rules={[{ required: true }]}>
            <Select onChange={handleCinemaChange}>
              {cinemas.map(cinema => (
                <Option key={cinema.value} value={cinema.value}>{cinema.label}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="movie" label="Movie" rules={[{ required: true }]}>
            <Select>
              {movies.map(movie => (
                <Option key={movie.value} value={movie.value}>{movie.label}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="room" label="Room" rules={[{ required: true }]}>
            <Select>
              {rooms.map(room => (
                <Option key={room.id} value={room.id}>{`Rạp ${room.screenNumber}`}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="showtime" label="Showtime" rules={[{ required: true }]}>
            <TimePicker format="HH:mm" minuteStep={30} style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}