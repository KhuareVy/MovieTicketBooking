// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Layout } from 'antd'
import Navbar from '../../components/Navbar' 
import Footer from '../../components/Footer'
import { Outlet } from 'react-router-dom';
const { Content } = Layout;

const UserLayout = () => {
  return (
    <Layout>
      <Navbar />
      <Content>
        <Outlet />
      </Content>
      <Footer />
    </Layout>
  )
}

export default UserLayout