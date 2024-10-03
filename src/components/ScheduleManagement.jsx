import React, { useState, useEffect } from 'react';
import { Table, Select, Input, Button, Modal, Form, DatePicker, TimePicker, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Option } = Select;

// Hardcoded data for this exercise
const cinemas = ['CGV Hùng Vương Plaza', 'CGV Thảo Điền Pearl', 'CGV Vincom Thủ Đức'];
const movies = ['Movie1', 'Movie2', 'Movie3'];
const rooms = ['Room1', 'Room2', 'Room3'];

export default function MovieScheduleManager() {
  const [schedules, setSchedules] = useState([]);
  const [filteredSchedules, setFilteredSchedules] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState('ALL');
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    // Simulating API fetch
    // In a real scenario, you would fetch data from an API here
    setSchedules([
      { id: 1, date: '2023-05-01', cinema: 'CGV Hùng Vương Plaza', movie: 'Movie1', room: 'Room1', showtime: '14:00' },
      { id: 2, date: '2023-05-01', cinema: 'CGV Thảo Điền Pearl', movie: 'Movie2', room: 'Room2', showtime: '16:30' },
      { id: 3, date: '2023-05-02', cinema: 'CGV Vincom Thủ Đức', movie: 'Movie3', room: 'Room3', showtime: '19:00' },
    ]);
  }, []);

  useEffect(() => {
    filterSchedules();
  }, [schedules, selectedCinema, searchText]);

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
    form.validateFields().then(values => {
      const newSchedule = {
        ...values,
        date: values.date.format('YYYY-MM-DD'),
        showtime: values.showtime.format('HH:mm'),
      };

      if (checkConflicts(newSchedule)) {
        Modal.confirm({
          title: 'Trùng lịch chiếu',
          content: 'Có một lịch chiếu bị trùng. Bạn có muốn tiếp tục không?',
          onOk: () => saveSchedule(newSchedule),
        });
      } else {
        saveSchedule(newSchedule);
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
    {
      title: 'Hành động',
      render: (_, record) => (
        <>
          <Button icon={<EditOutlined />} onClick={() => showModal(record)}>Sửa</Button>
          <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record)} style={{ marginLeft: 8 }} danger={true}>Xóa</Button>
        </>
      ),
    },
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
            <Option key={cinema} value={cinema}>{cinema}</Option>
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

      <Table
        columns={columns}
        dataSource={filteredSchedules}
        rowKey="id"
        scroll={{ x: true }}
      />

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
            <Select>
              {cinemas.map(cinema => (
                <Option key={cinema} value={cinema}>{cinema}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="movie" label="Movie" rules={[{ required: true }]}>
            <Select>
              {movies.map(movie => (
                <Option key={movie} value={movie}>{movie}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="room" label="Room" rules={[{ required: true }]}>
            <Select>
              {rooms.map(room => (
                <Option key={room} value={room}>{room}</Option>
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