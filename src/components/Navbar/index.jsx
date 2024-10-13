import React, { useState } from "react";
import { Menu, Drawer, Button, Dropdown, Space } from "antd";
import { MenuOutlined, DownOutlined } from "@ant-design/icons";
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
  const [visible, setVisible] = useState(false);

  // Hiển thị hoặc ẩn Drawer
  const showDrawer = () => setVisible(true);
  const closeDrawer = () => setVisible(false);

  return (
    <div className={styles.navbar}>
      {/* Logo */}
      <NavLink to="/" className={styles.logo}>
        Logo
      </NavLink>

      {/* Menu chính */}
      <div className={styles.menu}>
        <NavLink to="/mua-ve" className={styles.menuItem}>Mua vé</NavLink>

        <Dropdown menu={{movieMenu}}>
          <div className={styles.menuItem}>
            <Space>
              Phim
              <DownOutlined />
            </Space>
          </div>
        </Dropdown>

        <Dropdown menu={{theaterMenu}}>
          <div className={styles.menuItem}>
            <Space>
              Giá vé/Rạp
              <DownOutlined />
            </Space>
          </div>
        </Dropdown>
      </div>

      {/* Đăng nhập */}
      <div className={styles.login}>
        <NavLink to="/login" className={styles.button}>
          Đăng nhập
        </NavLink>
      </div>

      {/* Nút menu cho thiết bị nhỏ */}
      <Button
        className={styles.menuButton}
        type="none"
        icon={<MenuOutlined />}
        onClick={showDrawer}
      />

      {/* Sidebar (Drawer) */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={closeDrawer}
        open={visible}
        padding={{ padding: 0 }}
      >
        <Menu mode="vertical" style={{ backgroundColor: "#ffffff" }}>
          <Menu.Item key="1">
            <NavLink to="/mua-ve" onClick={closeDrawer}>
              Mua vé
            </NavLink>
          </Menu.Item>
          <Menu.SubMenu key="phim" title="Phim">
            <Menu.Item key="phim-dang-chieu">
              <NavLink to="/phim-dang-chieu" onClick={closeDrawer}>
                Phim đang chiếu
              </NavLink>
            </Menu.Item>
            <Menu.Item key="phim-sap-chieu">
              <NavLink to="/phim-sap-chieu" onClick={closeDrawer}>
                Phim sắp chiếu
              </NavLink>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu key="3" title="Giá vé/Rạp">
            <Menu.Item key="3-1">
              <NavLink to="/rap/galaxy-nguyen-du" onClick={closeDrawer}>
                Galaxy Nguyễn Du
              </NavLink>
            </Menu.Item>
            <Menu.Item key="3-2">
              <NavLink to="/rap/sala" onClick={closeDrawer}>
                Sala
              </NavLink>
            </Menu.Item>
            <Menu.Item key="3-3">
              <NavLink to="/rap/tan-binh" onClick={closeDrawer}>
                Tân Bình
              </NavLink>
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Drawer>
    </div>
  );
};

export default Navbar;