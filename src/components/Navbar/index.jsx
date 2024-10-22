// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Menu, Dropdown, Space, Avatar, Button } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import styles from './Navbar.module.css'; // Import CSS Module
import { AuthConsumer } from "../../contextAPI/AuthContext";
import { useNavigate } from "react-router-dom";
import { _get } from "../../config/axiosConfig";

const Navbar = () => {
  const { isLoggedIn, logout, userName } = AuthConsumer();
  const navigate = useNavigate();
  const [cinemas, setCinemas] = useState([]);

  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const response = await _get('/cinemas');
        setCinemas(response.data);
      } catch (error) {
        console.error('Error fetching cinemas:', error);
      }
    };

    fetchCinemas();
  }, []);

  const movieMenu = (
    <Menu>
      <Menu.Item key="showing">
        <NavLink to="phim-dang-chieu">Phim đang chiếu</NavLink>
      </Menu.Item>
      {/* <Menu.Item key="coming">
        <NavLink to="/phim-sap-chieu">Phim sắp chiếu</NavLink>
      </Menu.Item> */}
    </Menu>
  );
  
  const theaterMenu = (
    <Menu>
      {cinemas.map(cinema => (
        <Menu.Item key={cinema.id}>
          <NavLink to={`/rap/${cinema.id}`}>{cinema.name}</NavLink>
        </Menu.Item>
      ))}
    </Menu>
  );
  
  const avatarMenu = (
    <Menu>
      <Menu.Item key="logout">
        <Button onClick={() => {
          logout();
          navigate('/');
        }}>Đăng xuất</Button>
        <Menu.Item key="lich-su-dat-ve">
          <NavLink to="/lich-su-dat-ve" className={styles.menuItem}>Lịch sử đạt vé</NavLink>
        </Menu.Item>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.navbar}>
      <NavLink to="/" className={styles.logo}>
        Logo
      </NavLink>

      <div className={styles.menu}>
        {/* <NavLink to="/mua-ve" className={styles.menuItem}>Mua vé</NavLink> */}

        <Dropdown overlay={movieMenu}>
          <div className={styles.menuItem}>
            <Space>
              Phim
              <DownOutlined />
            </Space>
            {/* <NavLink to="mua-ve" className={styles.menuItem}>Mua vé</NavLink> */}
          </div>
        </Dropdown>

        <Dropdown overlay={theaterMenu}>
          <div className={styles.menuItem}>
            <Space>
              {/* <NavLink to="rap" className={styles.menuItem}>Rạp</NavLink> */}
              Rạp
              <DownOutlined />
            </Space>
            {/* <NavLink to="mua-ve" className={styles.menuItem}>Mua vé</NavLink> */}
          </div>
        </Dropdown>
      </div>

      <div className={styles.login}>
        {isLoggedIn ? (
          <Dropdown overlay={avatarMenu}>
            <div className={styles.menuItem}>
              <Space>
                <Avatar size="large" icon={<UserOutlined />} />
                {userName}
                <DownOutlined />
              </Space>
            </div>
          </Dropdown>
        ) : (
          <>
            <NavLink to="/login" className={styles.menuItem}>Đăng nhập</NavLink>
            <NavLink to="/register" className={styles.menuItem}>Đăng kí</NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;