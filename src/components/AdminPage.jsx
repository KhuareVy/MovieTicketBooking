// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { Button,Layout, theme } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import Sidebar from './Sidebar'
// import CustomHeader from './Header'
import AdminContent from './AdminContent';
import './AdminPage.css'

const { Sider, Header, Content } = Layout;
const AdminPage = () => {

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
          <AdminContent />
        </Content>
      </Layout>
    </Layout>
  )
}

export default AdminPage