import React, { useState } from 'react';
import './Navbar.css';
import { VideoCameraFilled, UserOutlined, MenuOutlined } from '@ant-design/icons';
import { Avatar, Drawer, Button } from 'antd';

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <div id="header">
        <a className="logo" href="#"><VideoCameraFilled style={{ fontSize: '30px', color: '#f5811f' }} /></a>
        <ul id="nav-bar">
          <li><a className="active" href="#">Mua vé</a></li>
          <li><a href="#">Phim</a></li>
          <li><a href="#">Rạp/Giá vé</a></li>
        </ul>
        <div className="right-icons">
          <a className="sign_up" href="#"><Avatar icon={<UserOutlined />} style={{ backgroundColor: '#f5811f' }} /></a>
          <Button className="menu-button" type="primary" icon={<MenuOutlined />} onClick={showDrawer} />
        </div>
      </div>
      <Drawer title="Menu" placement="right" onClose={onClose} open={visible}>
        <ul id="drawer-nav-bar">
          <li><a className="active" href="#">Mua vé</a></li>
          <li><a href="#">Phim</a></li>
          <li><a href="#">Rạp/Giá vé</a></li>
        </ul>
      </Drawer>
    </>
  );
};

export default Navbar;