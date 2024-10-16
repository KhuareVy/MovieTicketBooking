// eslint-disable-next-line no-unused-vars
import React, { useState }from 'react'
import { Outlet } from 'react-router-dom'
import { Button,Layout, theme } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import Sidebar from '../../components/Sidebar'
// import CustomHeader from './Header'
import '../../css/AdminPage.css'

const AdminLayout = () => {
  const { Sider, Header, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className="layout" style={{minHeight:'100vh'}}>
      <Sider
        theme="light" trigger={null} collapsible collapsed={collapsed} className="sider">
        <Sidebar />
          <Button
          type="txt"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          className="trigger-btn"/>
      </Sider>

      <Layout >
        <Header className="header">
          {/* <CustomHeader /> */}
        </Header>
        <Content className="content"  style={{ borderRadius: borderRadiusLG }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default AdminLayout