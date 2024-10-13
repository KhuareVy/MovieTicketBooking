// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Menu, Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import styles from './Navbar.module.css'; // Import CSS Module

const movieMenu = (
  <Menu>
    <Menu.Item key="showing">
      <NavLink to="/phim-dang-chieu">Phim đang chiếu</NavLink>
    </Menu.Item>
    <Menu.Item key="coming">
      <NavLink to="/phim-sap-chieu">Phim sắp chiếu</NavLink>
    </Menu.Item>
  </Menu>
);

const theaterMenu = (
  <Menu>
    <Menu.Item key="galaxy">
      <NavLink to="/rap/galaxy-nguyen-du">Galaxy Nguyễn Du</NavLink>
    </Menu.Item>
    <Menu.Item key="sala">
      <NavLink to="/rap/sala">Sala</NavLink>
    </Menu.Item>
    <Menu.Item key="tanbinh">
      <NavLink to="/rap/tan-binh">Tân Bình</NavLink>
    </Menu.Item>
  </Menu>
);

const Navbar = () => {

  return (
    <div className={styles.navbar}>
      <NavLink to="/" className={styles.logo}>
        Logo
      </NavLink>

      <div className={styles.menu}>
        <NavLink to="/mua-ve" className={styles.menuItem}>Mua vé</NavLink>

        <Dropdown overlay={movieMenu}>
          <div className={styles.menuItem}>
            <Space>
              Phim
              <DownOutlined />
            </Space>
          </div>
        </Dropdown>

        <Dropdown overlay={theaterMenu}>
          <div className={styles.menuItem}>
            <Space>
              Giá vé/Rạp
              <DownOutlined />
            </Space>
          </div>
        </Dropdown>
      </div>

      <div className={styles.login}>
        <NavLink to="/login" className={styles.button}>
          Đăng nhập
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;