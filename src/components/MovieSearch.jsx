/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const MovieSearch = ({ onSearch, value }) => {
  return (
    <Input
      placeholder="Tìm kiếm theo mã phim hoặc tiêu đề"
      prefix={<SearchOutlined />}
      onChange={(e) => onSearch(e.target.value)}
      value={value}
    />
  );
};

export default MovieSearch;