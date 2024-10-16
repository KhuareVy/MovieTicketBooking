/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Button, message, DatePicker, InputNumber } from 'antd';
import { _get, _post } from '../config/axiosConfig';
// import dayjs from 'dayjs';

const { TextArea } = Input;

const MovieForm = ({ visible, onCancel, onOk, form, editingMovie }) => {
  const [isGenreModalVisible, setIsGenreModalVisible] = useState(false);
  const [isActorModalVisible, setIsActorModalVisible] = useState(false);
  const [isDirectorModalVisible, setIsDirectorModalVisible] = useState(false);
  const [isCountryModalVisible, setIsCountryModalVisible] = useState(false);
  const [genres, setGenres] = useState([]);
  const [actors, setActors] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [countrys, setCountrys] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await _get('/genres');
        if (Array.isArray(response.data)) {
          const genreOptions = response.data.map(genre => ({
            value: genre.id,
            label: genre.name,
          }));
          setGenres(genreOptions);
        } else {
          console.error('API response is not an array:', response.data);
          message.error('Failed to fetch genres');
        }
      } catch (error) {
        console.error('Error fetching genres:', error);
        message.error('Failed to fetch genres');
      }
    };

    const fetchActors = async () => {
      try {
        const response = await _get('/actors');
        if (Array.isArray(response.data)) {
          const actorOptions = response.data.map(actor => ({
            value: actor.id,
            label: actor.name,
          }));
          setActors(actorOptions);
        } else {
          console.error('API response is not an array:', response.data);
          message.error('Failed to fetch actors');
        }
      } catch (error) {
        console.error('Error fetching actors:', error);
        message.error('Failed to fetch actors');
      }
    };

    const fetchDirectors = async () => {
      try {
        const response = await _get('/directors');
        if (Array.isArray(response.data)) {
          const directorOptions = response.data.map(director => ({
            value: director.id,
            label: director.name,
          }));
          setDirectors(directorOptions);
        } else {
          console.error('API response is not an array:', response.data);
          message.error('Failed to fetch directors');
        }
      } catch (error) {
        console.error('Error fetching directors:', error);
        message.error('Failed to fetch directors');
      }
    };

    const fetchCountrys = async () => {
      try {
        const response = await _get('/countries');
        if (Array.isArray(response.data)) {
          const countryOptions = response.data.map(country => ({
            value: country.id,
            label: country.name,
          }));
          setCountrys(countryOptions);
        } else {
          console.error('API response is not an array:', response.data);
          message.error('Failed to fetch countrys');
        }
      } catch (error) {
        console.error('Error fetching countrys:', error);
        message.error('Failed to fetch countrys');
      }
    };

    fetchGenres();
    fetchActors();
    fetchDirectors();
    fetchCountrys();
  }, []);

  useEffect(() => {
    if (editingMovie) {
      form.setFieldsValue({
        ...editingMovie,
        // releaseDate: dayjs(editingMovie.releaseDate),
      });
    }
  }, [editingMovie, form]);

  const handleGenreChange = (value) => {
    if (value === 'addNew') {
      setIsGenreModalVisible(true);
    } else {
      form.setFieldsValue({ genre: value });
    }
  };

  const handleActorChange = (value) => {
    if (value.includes('addNew')) {
      setIsActorModalVisible(true);
    } else {
      form.setFieldsValue({ actors: value });
    }
  };

  const handleDirectorChange = (value) => {
    if (value === 'addNew') {
      setIsDirectorModalVisible(true);
    } else {
      form.setFieldsValue({ director: value });
    }
  };

  const handleCountryChange = (value) => {
    if (value === 'addNew') {
      setIsCountryModalVisible(true);
    } else {
      form.setFieldsValue({ country: value });
    }
  };

  const handleAddGenre = async (values) => {
    console.log('values:', values);
    try {
      
      const response = await _post('/genres', { name: values.newGenre });
      const newGenre = {
        value: response.data.id,
        label: response.data.name,
      };
      setGenres([...genres, newGenre]);
      setIsGenreModalVisible(false);
      message.success('Thể loại mới đã được thêm');
    } catch (error) {
      console.error('Error adding genre:', error);
      message.error('Failed to add genre');
    }
  };

  const handleAddActor = async (values) => {
    try {
      const response = await _post('/actors', { name: values.newActor, birthDate: values.birthDay, picture: values.picture, countryID: values.country });
      const newActor = {
        value: response.data.id,
        label: response.data.name,
      };
      setActors([...actors, newActor]);
      setIsActorModalVisible(false);
      message.success('Diễn viên mới đã được thêm');
    } catch (error) {
      console.error('Error adding actor:', error);
      message.error('Failed to add actor');
    }
  };

  const handleAddDirector = async (values) => {
    try {
      console.log('values:', values);
      const response = await _post('/directors', { name: values.newDirector , birthDate: values.birthDay, picture: values.picture, countryID: values.country });
      const newDirector = {
        value: response.data.id,
        label: response.data.name,
      };
      setDirectors([...directors, newDirector]);
      setIsDirectorModalVisible(false);
      message.success('Đạo diễn mới đã được thêm');
    } catch (error) {
      console.error('Error adding director:', error);
      message.error('Failed to add director');
    }
  }

  const handleAddCountry = async (values) => {
    try {
      const response = await _post('/countries', { name: values.newCountry });
      const newCountry = {
        value: response.data.id,
        label: response.data.name,
      };
      setCountrys([...countrys, newCountry]);
      setIsCountryModalVisible(false);
      message.success('Quốc gia mới đã được thêm');
    } catch (error) {
      console.error('Error adding country:', error);
      message.error('Failed to add country');
    }
  }

  return (
    <>
      <Modal
        title={editingMovie ? 'Chỉnh Sửa Phim' : 'Thêm Phim'}
        open={visible}
        onOk={onOk}
        onCancel={onCancel}
        width={700}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="movieCode"
            label="Mã Phim"
            rules={[{ required: true, message: 'Vui lòng nhập mã phim!' }]}
            disabled={true}
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
            <Select onChange={handleGenreChange}>
              {genres.map((genre) => (
                <Select.Option key={genre.value} value={genre.value}>
                  {genre.label}
                </Select.Option>
              ))}
              <Select.Option value="addNew">Thêm mới</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="actors"
            label="Diễn Viên"
            rules={[{ required: true, message: 'Vui lòng chọn diễn viên!' }]}
          >
            <Select mode="multiple" onChange={handleActorChange}>
              {actors.map((actor) => (
                <Select.Option key={actor.value} value={actor.value}>
                  {actor.label}
                </Select.Option>
              ))}
              <Select.Option value="addNew">Thêm mới</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="director"
            label="Đạo diễn"
            rules={[{ required: true, message: 'Vui lòng nhập tên đạo diễn!' }]}
          >
            <Select onChange={handleDirectorChange}>
              {directors.map((director) => (
                <Select.Option key={director.value} value={director.value}>
                  {director.label}
                </Select.Option>
              ))}
              <Select.Option value="addNew">Thêm mới</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="country"
            label="Quốc Gia"
            rules={[{ required: true, message: 'Vui lòng nhập quốc gia!' }]}
          >
            <Select onChange={handleCountryChange}>
              {countrys.map((country) => (
                <Select.Option key={country.value} value={country.value}>
                  {country.label}
                </Select.Option>
              ))}
              <Select.Option value="addNew">Thêm mới</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="duration"
            label="Thời Lượng"
            rules={[{ required: true, message: 'Vui lòng nhập thời lượng!' }]}>
            <InputNumber min={60} />
          </Form.Item>
          <Form.Item
            name="releaseDate"
            label="Ngày Phát Hành"
            rules={[{ required: true, message: 'Vui lòng nhập ngày phát hành!' }]}>
            <DatePicker onChange={(date, dateString) => {
              console.log(date, dateString);
            }
            } />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Thêm Thể Loại Mới"
        open={isGenreModalVisible}
        onCancel={() => setIsGenreModalVisible(false)}
        footer={null}
      >
        <Form onFinish={handleAddGenre} layout="vertical">
          <Form.Item
            name="newGenre"
            label="Thể Loại Mới"
            rules={[{ required: true, message: 'Vui lòng nhập thể loại mới!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Thêm Diễn Viên Mới"
        open={isActorModalVisible}
        onCancel={() => setIsActorModalVisible(false)}
        footer={null}
      >
        <Form onFinish={handleAddActor} layout="vertical">
          <Form.Item
            name="newActor"
            label="Diễn Viên Mới"
            rules={[{ required: true, message: 'Vui lòng nhập tên diễn viên mới!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="birthDay"
            label="Ngày Sinh"
            rules={[ { required:true, message: 'Vui lòng nhập ngày sinh diễn viên mới!' }]}>
            <DatePicker onChange={(date, dateString) => {
              console.log(date, dateString);
            }
            } />
          </Form.Item>
          <Form.Item
            name="picture"
            label="Hình Ảnh"
            rules={[{ required: true, message: 'Vui lòng nhập hình ảnh diễn viên mới!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="country"
            label="Quốc Gia"
            rules={[{ required: true, message: 'Vui lòng nhập quốc gia!' }]}
          >
            <Select onChange={handleCountryChange}>
              {countrys.map((country) => (
                <Select.Option key={country.value} value={country.value}>
                  {country.label}
                </Select.Option>
              ))}
              <Select.Option value="addNew">Thêm mới</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Thêm Đạo Diễn Mới"
        open={isDirectorModalVisible}
        onCancel={() => setIsDirectorModalVisible(false)}
        footer={null}
      >
        <Form onFinish={handleAddDirector} layout="vertical">
          <Form.Item
            name="newDirector"
            label="Tên Đạo Diễn Mới"
            rules={[{ required: true, message: 'Vui lòng nhập tên đạo diễn mới!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="birthDay"
            label="Ngày Sinh"
            rules={[ { required:true, message: 'Vui lòng nhập ngày sinh đạo diễn mới!' }]}>
            <DatePicker onChange={(date, dateString) => {
              console.log(date, dateString);
            }
            } />
          </Form.Item>
          <Form.Item
            name="picture"
            label="Hình Ảnh"
            rules={[{ required: true, message: 'Vui lòng nhập hình ảnh đạo diễn mới!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="country"
            label="Quốc Gia"
            rules={[{ required: true, message: 'Vui lòng nhập quốc gia!' }]}
          >
            <Select onChange={handleCountryChange}>
              {countrys.map((country) => (
                <Select.Option key={country.value} value={country.value}>
                  {country.label}
                </Select.Option>
              ))}
              <Select.Option value="addNew">Thêm mới</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Thêm Quốc Gia Mới"
        open={isCountryModalVisible}
        onCancel={() => setIsCountryModalVisible(false)}
        footer={null}
      >
        <Form onFinish={handleAddCountry} layout="vertical">
          <Form.Item
            name="newCountry"
            label="Tên Quốc Gia Mới"
            rules={[{ required: true, message: 'Vui lòng nhập quốc gia mới!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default MovieForm;