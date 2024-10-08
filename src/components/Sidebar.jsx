import React from 'react';
import { Menu } from 'antd';
import { UserOutlined, VideoCameraOutlined, CalendarOutlined, LogoutOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const menuItems = [
    {
      key: '1',
      icon: <UserOutlined />,
      label: <NavLink to="/users">Quản lý người dùng</NavLink>,
    },
    {
      key: '2',
      icon: <VideoCameraOutlined />,
      label: <NavLink to="/movies">Quản lý phim</NavLink>,
    },
    {
      key: '3',
      icon: <CalendarOutlined />,
      label: <NavLink to="/schedule">Quản lý lịch chiếu</NavLink>,
    },
    // {
    //   key: '4',
    //   icon: <LogoutOutlined />,
    //   label: 'Đăng xuất',
    //   danger: true,
    // },
  ];

  return (
    <>
      <div className="logo"></div>
      <Menu mode="inline" items={menuItems} className="menu-bar" />
    </>
  );
};

export default Sidebar;