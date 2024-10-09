import React from 'react'
import { Layout } from 'antd'
import { FaAngleDown } from "react-icons/fa";
import { Dropdown, Space } from 'antd';
import styles from './Navbar.module.css'
import { NavLink } from 'react-router-dom';

const { Header } = Layout;

const items = [
    {
      key: '1',
      label: (
        <NavLink to="/phim-dang-chieu"> Phim đang chiếu </NavLink>
      ),
    },
    {
        key: '2',
        label: (
            <NavLink to="/phim-sap-chieu"> Phim sắp chiếu </NavLink>
        ),
      }
  ];

const Navbar = () => {
  return (
    <Header className={styles.header}>
        <NavLink to="/" className={styles.logo}>Logo</NavLink>

        <nav className={styles.navbar}>
            <NavLink to="/">Mua vé</NavLink>
                <Dropdown
                menu={{
                items,
                }}
            >
                <a onClick={(e) => e.preventDefault()}>
                <Space>
                    Phim
                    <FaAngleDown />
                </Space>
                </a>
            </Dropdown>
            <NavLink to="/">Rạp/Giá vé</NavLink>
        </nav>        
        <a href="#" className={styles.btn_login}>Đăng nhập</a>
    </Header>   
  )
}

export default Navbar